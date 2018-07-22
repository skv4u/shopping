import { Component, OnInit } from '@angular/core';
import {CommonService} from './../shared/common.service';
import { shopping } from './../model/model';

@Component({
  selector: 'app-order-place',
  templateUrl: './order-place.component.html',
  styleUrls: ['./order-place.component.css'],
  providers:[CommonService]  
})
export class OrderPlaceComponent implements OnInit {
  thumbPath: string = './assets/images/thumb/';
  largePath: string = './assets/images/large/';
  list: shopping[] = [];
  updateTopCart: boolean = true;
  checkoutList: any[] = [];
  subTotal: number = 0;
  user:any = {
    "name":"",
    "email":"",
    "mobile":"",
    "address":""
    }
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
  }
  getDetailByID(productID: number) {
    for (let m of this.list) {
      if (m.ID == productID) {
        return m
      }
    }
    return null;
  }
  

}
