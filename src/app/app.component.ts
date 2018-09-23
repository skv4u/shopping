import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  topMenu : any[] = [];
  collapse: string = 'collapse';
  categoryList:any[]=[
    {"Name":"Home","URL":"home","List":[]},
    {"Name":"Necklaces","URL":"","List":["PearlBead","GermanSilver","Ghungroo","Brass","Dokra","Agate","Fabric","Thread","Contemporary","Statement"]},
    {"Name":"Earrings","URL":"home","List":["PearlBead","GermanSilver","Dokra","Fabric","Agate","Thread"]},
    {"Name":"Others","URL":"other-sale","List":[]},
    {"Name":"Sale With Us","URL":"sale-with-us","List":[]},
    {"Name":"About Us","URL":"about","List":[]}
  ];
  constructor(public router: Router){
    let page = window.location.hash.substring(2);
    this.topMenu = [
      {"Name":"Home","Url":"/home","isActive":page == 'home'},
      {"Name":"About","Url":"/about","isActive":page == 'about'},
      {"Name":"Contact","Url":"/contact","isActive":page == 'contact'}
    ]
  }
  makeActive(index:number,Url:string){
    for(let m in this.topMenu){
      this.topMenu[m].isActive = false
    }
    this.topMenu[index].isActive = true
    this.router.navigate([Url]);
  }
  toggleMenu(){
    this.collapse = this.collapse == 'collapse' ? '' : 'collapse';
  }
  routeToPage(page:string){
    this.router.navigate(['/'+page]);
  }
  categoryFilter(type:string){

    this.router.navigate(['/category/' + type]);
    
  }
}


