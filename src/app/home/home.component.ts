import { Component, OnInit } from '@angular/core';
import { CommonService } from './../shared/common.service';
import { Router } from '@angular/router';
import { shopping } from './../model/model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CommonService]

})
export class HomeComponent implements OnInit {

  categoryList:string[]=["All","Necklaces","Earrings","Other","Sale"]
  list: shopping[] = [];
  thumbPath: string = './assets/images/thumb/';
  largePath: string = './assets/images/large/';
  updateTopCart: boolean = true;
  tempStorage:shopping[]=[];
  searchText:string='';
  constructor(public commonService: CommonService,
    public router: Router) {

  }


  ngOnInit() {
    this.commonService.ListData().subscribe(
      data => {
        this.list = data;
        this.tempStorage = data;
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
    if (elem.target.tagName.toLowerCase() == 'button') {
      let index:any = this.product(code);
      this.addToCart(index.Index);
    }
    else {
      this.router.navigate(['/product/' + code]);
    }
  }
  addToCart(index: number) {
    let selectedList = this.commonService.getProductDetail();
    console.log(selectedList);
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
  categoryFilter(category:string){
    if(category == 'All'){
      this.list = JSON.parse(JSON.stringify(this.tempStorage));
    }
    else {
      this.list = this.tempStorage.filter((v)=>{
        return v.Category == category
      });

    }
  }
  searchProduct(){
    // console.log(this.searchText)
    this.list = this.tempStorage.filter((v)=>{
      return v.Title.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1
    });
  }

}
