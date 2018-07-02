import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'
import { CommonService } from './../shared/common.service';


@Component({
  selector: 'app-cart-top',
  templateUrl: './cart-top.component.html',
  styleUrls: ['./cart-top.component.css'],
  providers: [CommonService]
})
export class CartTopComponent implements OnInit {

  total: number = 0
  price: number = 0
  constructor(public commonService: CommonService, public router: Router) { }

  ngOnInit() {
    // let selectedList = 
    this.total = this.commonService.getTotalQuantity();
    this.price = this.commonService.getTotalPrice();
  }
  clearCart() {
    this.commonService.clearStorage();
    this.total = 0;
    this.price = 0;
  }
  routeToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
