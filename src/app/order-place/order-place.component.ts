import { Component, OnInit } from '@angular/core';
import { CommonService } from './../shared/common.service';
import { shopping } from './../model/model';

@Component({
  selector: 'app-order-place',
  templateUrl: './order-place.component.html',
  styleUrls: ['./order-place.component.css'],
  providers: [CommonService]
})
export class OrderPlaceComponent implements OnInit {
  thumbPath: string = './assets/images/thumb/';
  largePath: string = './assets/images/large/';
  list: shopping[] = [];
  updateTopCart: boolean = true;
  IsOrderProcessing: boolean = false;

  checkoutList: any[] = [];

  subTotal: number = 0;
  user: any = {
    "name": "",
    "email": "",
    "mobile": "",
    "address": ""
  }
  validForm: boolean = false;
  orderSuccess: boolean = false;
  validationMessage: string = "";
  constructor(public commonService: CommonService) { }

  ngOnInit() {
    this.commonService.ListData().subscribe(
      data => {
        this.list = data;
        this.updateList();
      }
    );
  }
  updateList() {
    let selectedList = this.commonService.getProductDetail();
    if(selectedList && selectedList.length){
    let total = 0;
    for (let m of selectedList) {
      let currentObject: any = this.getDetailByID(m.ID);
      if (currentObject) {
        this.checkoutList.push({
          "ID": currentObject.ID,
          "Code": currentObject.Code,
          "Title": currentObject.Title,
          "Image": currentObject.Image,
          "Price": currentObject.Price,
          "Quantity": m.Quantity,
          "Total": currentObject.Price * m.Quantity
        });
        total = total + (currentObject.Price * m.Quantity)
      }
    }
    this.subTotal = total;
  }
  }
  updateTotal() {
    let total = 0;
    for (let m of this.checkoutList) {
      total = total + (m.Price * m.Quantity);
    }
    this.subTotal = total;
  }
  getDetailByID(productID: number) {
    for (let m of this.list) {
      if (m.ID == productID) {
        return m
      }
    }
    return null;
  }
  confirm_order() {
    if (!this.isFormValid()) {
      setTimeout(() => {
        this.validForm = false;
        this.validationMessage = "";
      }, 7000);
      return;
    }
    if(!this.checkoutList.length){
      this.validForm = true;
      this.validationMessage = "Oops! you haven't selected any product to Order";
      return false;
    }
    // console.log(this.checkoutList);

    // if(1){
    //   return;
    // }
    let address = this.user.address.replace(/\r\n|\n|\n\r\|r\r/g, "<br>");
    let imageURL = "http://srkk.co.in/demo/assets/images/thumb/"
    let baseURL = "http://srkk.co.in/demo/" //http://srkk.co.in/demo/#/product/101
    let message: string = `
    <p>Dear SRKK,</p>
    <p>You have following orders,</p>
    <table style="height: 34px; width: 700px; border: 1px solid #999; text-align:center;">
    <tbody>
    <tr>
    <th style="width: 69px; height: 18px;  border: 1px solid #999;">Name</th>
    <th style="width: 143px; height: 18px; border: 1px solid #999;">Email</th>
    <th style="width: 107px; height: 18px; border: 1px solid #999;">Mobile</th>
    <th colspan="2" style="width: 69px; height: 18px; border: 1px solid #999;">Address</th>    
    </tr>
    <tr>
    <td style="width: 69px; height: 18px;  border: 1px solid #999;">${this.user.name}</td>
    <td style="width: 143px; height: 18px; border: 1px solid #999;">${this.user.email}</td>
    <td style="width: 107px; height: 18px; border: 1px solid #999;">${this.user.mobile}</td>
    <td colspan="2" style="width: 69px; height: 18px; border: 1px solid #999;">${address}</td>    
    </tr>
    <tr>
    <th style="width: 69px; height: 18px;  border: 1px solid #999;">Product</th>
    <th style="width: 143px; height: 18px; border: 1px solid #999;">Title</th>
    <th style="width: 107px; height: 18px; border: 1px solid #999;">Price</th>
    <th style="width: 69px; height: 18px; border: 1px solid #999;">Quantity</th>
    <th style="width: 69px; height: 18px; border: 1px solid #999;">Total</th>
    </tr>`;

    for (let m of this.checkoutList) {
      message += '<tr>';
      message += `<td style="width: 69px; height: 43px;border: 1px solid #999;text-align:center;"><a href="${baseURL + '#/product/' + m.Code}"><img src="${imageURL + m.Image}" width="28" height="28" /></a></td>
      <td style="width: 143px; height: 43px;border: 1px solid #999;"><a href="${baseURL + '#/product/' + m.Code}">${m.Title}</a></td>
      <td style="width: 107px; height: 43px;border: 1px solid #999;">${m.Price}</td>
      <td style="width: 69px; height: 43px;border: 1px solid #999;">${m.Quantity}</td>
      <td style="width: 69px; height: 43px;border: 1px solid #999;">${m.Total}</td>`;
      message += '</tr>';
    }
    message += `<tr>
    <td style="width: 69px; height: 43px;border: 1px solid #999;">&nbsp;</td>
    <td style="width: 143px; height: 43px;border: 1px solid #999;">&nbsp;</td>
    <td style="width: 69px; height: 43px;border: 1px solid #999;" colspan="2">&nbsp;SubTotal</td>
    <td style="width: 69px; height: 43px;border: 1px solid #999;">&nbsp;${this.subTotal}</td>
    </tr>
    </tbody>
    </table>
    <p>&nbsp;</p>
    <p>Regards,</p>
    <p>SRKK</p>`;
    let jsonEmail = {
      "From": this.user.email,
      "Subject": "Order From " + this.user.name + ", Mobile : " + this.user.mobile,
      "Message": message
    };
    this.IsOrderProcessing = true;
    this.commonService.postMethod(jsonEmail).subscribe(
      data => {
        // console.log(data);
        this.orderSuccess = true;
        this.commonService.clearStorage();
        this.IsOrderProcessing = false;
        this.updateTopCart = false;
        setTimeout(() => {
          this.updateTopCart = true;
        }, 200)

      }
    )
  }
  isFormValid() {
    if (this.user.name == "" || this.user.name.trim() == "" ||
      this.user.email == "" || this.user.email.trim() == "" ||
      this.user.mobile == "" || this.user.mobile.trim() == "" ||
      this.user.address == "" || this.user.address.trim() == "") {
      this.validForm = true;
      this.validationMessage = "Please file the details";
      return false;
    }
    else if (!this.validateEmail(this.user.email)) {
      this.validForm = true;
      this.validationMessage = "Please enter valid Email";
      return false;
    }
    else if (!this.validateMobile(this.user.mobile)) {
      this.validForm = true;
      this.validationMessage = "Please enter valid Mobile";
      return false;
    }
    this.validForm = false;
    this.validationMessage = "";
    return true;
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateMobile(mobile) {
    let re = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return re.test(mobile);
  }
}
