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
  categoryList:any[]=[{"Name":"Home","List":[]},
  {"Name":"Necklaces","List":["Beads","German Silver","Ghungroo","Brass","Dokra","Agate","Fabric","Thread","Contempary","Statement"]},
  {"Name":"Earrings","List":["Beads","German Silver","Dokra","Fabric","Agate","Thread"]},
  {"Name":"Others","List":[]},{"Name":"Sale With Us","List":[]},{"Name":"About Us","List":[]}];
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
  routeToHome(){
    this.router.navigate(['/home']);
  }
  categoryFilter(type:string){
    this.router.navigate(['/category/' + type]);
    
  }
}


