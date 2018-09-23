import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/filter';

import { CommonService } from './../shared/common.service';
import { Router,NavigationStart } from '@angular/router';
import { shopping } from './../model/model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CommonService]
  
})
export class CategoryComponent implements OnInit {

  list: shopping[] = [];
  thumbPath: string = './assets/images/thumb/';
  largePath: string = './assets/images/large/';
  updateTopCart: boolean = true;
  tempStorage:shopping[]=[];
  constructor(
    public commonService: CommonService,
    private router: Router
  )
    {
    //   this.router.events.subscribe(path  => {
    //     console.log(path);
    //     this.filterbycategory();
    // });  
    router.events
    .filter(event => event instanceof NavigationStart)
    .subscribe((event:NavigationStart) => {
      // console.log(event.url)
      this.filterbycategory(event.url);
    });
     }
    

  ngOnInit() {
    this.filterbycategory();
  }
  filterbycategory(category?:string){
    let productCategory = window.location.hash.substring(window.location.hash.lastIndexOf('/')+1);
    if(category){
      productCategory = category.substring(category.lastIndexOf('/')+1);
    }
    console.log(productCategory);
    this.commonService.ListData().subscribe(
      data => {
        // this.list = data;
        // this.tempStorage = data;
        let filterData:shopping[]=[];
        for(let m in data){
          if(data[m].Category.indexOf(productCategory) != -1 || data[m].Description.indexOf(productCategory) !=-1){
            filterData.push(data[m]);
          }
        }
        this.list = filterData;
        console.log(this.list);
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
  productTarget(code: string, elem: any) {
    // console.log(elem.target.tagName);
    if (elem.target.tagName.toLowerCase() == 'button' || elem.target.tagName.toLowerCase()=='i') {
      let index:any = this.product(code);
      this.addToCart(index.Index);
    }
    else {
      this.router.navigate(['/product/' + code]);
    }
  }
  addToCart(index: number) {
    let selectedList = this.commonService.getProductDetail();
    // console.log(selectedList);
    if (selectedList == undefined || selectedList == null) {
      let addtocart = [
        {
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

  getDetailByID(productID: number) {
    for (let m of this.list) {
      if (m.ID == productID) {
        return m;
      }
    }
    return null;
  }

}
