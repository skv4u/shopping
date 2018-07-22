import { Component, OnInit } from '@angular/core';
import { shopping } from './../model/model';
import { CommonService } from './../shared/common.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [CommonService]

})
export class CheckoutComponent implements OnInit {
  thumbPath: string = './assets/images/thumb/';
  largePath: string = './assets/images/large/';
  list: shopping[] = [];
  updateTopCart: boolean = true;
  checkoutList: any[] = [];
  subTotal: number = 0;
  constructor(public commonService: CommonService) { }


  ngOnInit() {
    this.commonService.ListData().subscribe(
      data => {
        this.list = data;
        this.updateList();
      }
    );

    // console.log(selectedList);    
  }
  updateList() {
    let selectedList = this.commonService.getProductDetail();
    let total = 0;
    for (let m of selectedList) {
      let currentObject: any = this.getDetailByID(m.ID);
      if (currentObject) {
        this.checkoutList.push({
          "ID": currentObject.ID,
          "Code":currentObject.Code,
          "Title": currentObject.Title,
          "Image": currentObject.Image,
          "Price": currentObject.Price,
          "Quantity": m.Quantity,
          "Total": currentObject.Price * m.Quantity,
          "MasterIndex": currentObject.index
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
    this.updateCart();
  }
  getDetailByID(productID: number) {
    for (let m of this.list) {
      if (m.ID == productID) {
        return m
      }
    }
    return null;
  }
  updateCart() {
    let storage: any[] = [];
    for (let m of this.checkoutList) {
      storage.push(
        {
          "ID": m.ID,
          "Quantity": m.Quantity,
          "Price": m.Price
        }
      );
    }
    this.commonService.setProductDetail(storage);
  }
  removeFromList(index:number){
    this.checkoutList.splice(index,1);
    this.updateCart();
  }


}
