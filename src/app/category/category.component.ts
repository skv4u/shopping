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
      console.log(event.url)
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
          if(data[m].Category == productCategory){
            filterData.push(data[m]);
          }
        }
        this.list = filterData;
        console.log(this.list);
      }
    )
  }

}
