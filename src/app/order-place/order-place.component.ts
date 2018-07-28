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
      }, 3000);
      return;
    }
    // console.log(this.checkoutList);
    
    // if(1){
    //   return;
    // }
    let address = this.user.address.replace(/\n/g,"<br>");
    let imageURL = "http://srkk.co.in/demo/assets/images/thumb/"
    let baseURL = "http://srkk.co.in/demo/" //http://srkk.co.in/demo/#/product/101
    let message:string = `<p>&nbsp;</p>
    <p>Dear SRKK,</p>
    <p>User detail :</p>
    <p>Name : ${this.user.name}</p>
    <p>Email : ${this.user.email}</p>
    <p>Mobile : ${this.user.mobile}</p>
    <p>Shipping Address :<br>
    ${this.user.address}
    <hr>
    <p>You have following orders,</p>
    <table style="height: 34px; width: 412px; border: 1px solid #999;">
    <tbody>
    <tr>
    <td style="width: 69px; height: 18px;  border: 1px solid #999;">Product</td>
    <td style="width: 143px; height: 18px; border: 1px solid #999;">Title</td>
    <td style="width: 107px; height: 18px; border: 1px solid #999;">Price</td>
    <td style="width: 69px; height: 18px; border: 1px solid #999;">Quantity</td>
    <td style="width: 69px; height: 18px; border: 1px solid #999;">Total</td>
    </tr>`;

    for(let m of this.checkoutList){
      message +='<tr>';
      message += `<td style="width: 69px; height: 43px;border: 1px solid #999;"><a href="${baseURL+'#/product/' + m.Code}"><img src="${imageURL+m.Image}" width="28" height="28" /></a></td>
      <td style="width: 143px; height: 43px;border: 1px solid #999;"><a href="${baseURL+'#/product/' + m.Code}">${m.Title}</a></td>
      <td style="width: 107px; height: 43px;border: 1px solid #999;">${m.Price}</td>
      <td style="width: 69px; height: 43px;border: 1px solid #999;">${m.Quantity}</td>
      <td style="width: 69px; height: 43px;border: 1px solid #999;">${m.Total}</td>`;
      message +='</tr>';
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
      "From":this.user.email,
      "Subject": "Order From " + this.user.name + ", Mobile : "+ this.user.mobile,
      "Message":message
    };
    this.commonService.postMethod(jsonEmail).subscribe(
      data =>{
        console.log(data);
        this.orderSuccess=true;
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
    this.validForm = true;
    this.validationMessage = "Please enter valid Mobile";
    return true;
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateMobile(mobile) {
    let re = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return !re.test(mobile);
  }
}
