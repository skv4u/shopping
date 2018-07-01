import { Component, OnInit } from '@angular/core';
import {CommonService} from './../shared/common.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers:[CommonService]
})
export class ProductComponent implements OnInit {
  productID:number = 0;
  productData : any = {};
  thumbPath:string = './assets/images/thumb/';
  largePath:string = './assets/images/large/';
  constructor(public commonService:CommonService) { }

  ngOnInit() {
    
    this.productID = Number(window.location.hash.substring(window.location.hash.lastIndexOf('/')+1));
    this.commonService.ListData().subscribe(
      data => {
        
        for(let m of data){
          if(m.ID == this.productID){
            this.productData = m;
            break;
          }
        }
        // console.log(this.productData);
      }
    
    )
  }
  

}
