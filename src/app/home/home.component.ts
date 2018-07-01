import { Component, OnInit } from '@angular/core';
import { CommonService } from './../shared/common.service';
import { Router } from '@angular/router'
import { shopping } from './../model/model'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CommonService]

})
export class HomeComponent implements OnInit {


  list: shopping[] = [];
  thumbPath: string = './assets/images/thumb/';
  largePath: string = './assets/images/large/';
  updateTopCart: boolean = true;
  constructor(public commonService: CommonService,
    public router: Router) {

  }

  ngOnInit() {
    this.commonService.ListData().subscribe(
      data => {
        this.list = data;
      }
    )
  }
  productTarget(index: number, elem: any) {
    // console.log(elem.target.tagName);
    if (elem.target.tagName.toLowerCase() == 'button') {
      this.addToCart(index);
    }
    else {
      this.router.navigate(['/product/' + index]);
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
