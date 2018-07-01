import { Component, OnInit } from '@angular/core';
import {CommonService} from './../shared/common.service';
import {shopping} from './../model/model'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers : [CommonService]
  
})
export class HomeComponent implements OnInit {


  list:shopping[] = [];
  thumbPath:string = './assets/images/thumb/';
  largePath:string = './assets/images/large/';

  constructor(public commonService:CommonService)
  {
    
  }

  ngOnInit() {
    this.commonService.ListData().subscribe(
      data => {
        this.list = data;
      }
    )
  }

}
