import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  topMenu : any[] = [
    {"Name":"Home","Url":"/home","isActive":true},
    {"Name":"About","Url":"/about","isActive":false},
    {"Name":"Contact","Url":"/contact","isActive":false}
  ];
  constructor(public router: Router){
  }
  makeActive(index:number,Url:string){
    for(let m in this.topMenu){
      this.topMenu[m].isActive = false
    }
    this.topMenu[index].isActive = true
    this.router.navigate([Url]);
  }
}


