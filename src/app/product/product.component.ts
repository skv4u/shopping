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
  // subPath:string = './assets/images/sublist/';
  list: shopping[] = [];
  updateTopCart: boolean = true;  
  
  constructor(public commonService:CommonService) { }

  ngOnInit() {    
    let productCode = window.location.hash.substring(window.location.hash.lastIndexOf('/')+1);
    this.commonService.ListData().subscribe(
      data => {
        this.list = data;
        let x:any = this.product(productCode);
        this.productData = x.Data;
        this.productData.Image = this.largePath + this.productData.OtherImages[0];
        this.productIndex = x.Index;
      }    
    )
  }
  product(code:string){
    for(let m in this.list){
      if(this.list[m].Code == code){
        return {"Index":Number(m),"Data":this.list[m]};
      }
    }
    return null;
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
    let x = document.getElementById('snackbar');
    x.className = 'show';
    setTimeout(()=>{
      x.className = x.className.replace("show", "");
    },3000);
  }
  initializeTopCart() {
    this.updateTopCart = false;
    setTimeout(() => {
      this.updateTopCart = true;
    }, 200)
  }
  changePath(path){
    this.productData.Image = path;
  }
}
