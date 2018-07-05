import { Component, OnInit } from '@angular/core';
import {CommonService} from './../shared/common.service';
import { shopping } from './../model/model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers:[CommonService]
})
export class ProductComponent implements OnInit {
  productIndex:number = 0;
  productData : any = {};
  thumbPath:string = './assets/images/thumb/';
  largePath:string = './assets/images/large/';
  list: shopping[] = [];
  updateTopCart: boolean = true;  
  
  constructor(public commonService:CommonService) { }

  ngOnInit() {    
    this.productIndex = Number(window.location.hash.substring(window.location.hash.lastIndexOf('/')+1));
    this.commonService.ListData().subscribe(
      data => {
        this.list = data;
        this.productData = data[this.productIndex]
      }    
    )
  }
  addToCart(index: number) {
    let selectedList = this.commonService.getProductDetail();
    if (selectedList == undefined || selectedList == null) {
      let addtocart = [{
          "ID": this.list[index].ID,
          "Quantity": 1,
          "Price": this.list[index].Price
        }
      ];
      this.commonService.setProductDetail(addtocart);
    }
    else {
      let flag: boolean = false;
      for (let m of selectedList) {
        if (m.ID == this.list[index].ID) {
          m.Quantity = m.Quantity + 1;
          flag = true;
          break;
        }
      }
      if (!flag) {
        let addtocart =
          {
            "ID": this.list[index].ID,
            "Quantity": 1,
            "Price": this.list[index].Price
          };
        selectedList.push(addtocart);

      }
      this.commonService.setProductDetail(selectedList);
    }
    this.initializeTopCart();
  }
  initializeTopCart() {
    this.updateTopCart = false;
    setTimeout(() => {
      this.updateTopCart = true;
    }, 200)
  }
}
