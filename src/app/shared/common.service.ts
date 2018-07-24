import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CommonService {
  
  baseURL:string = 'http://srkk.co.in/sample.php';
  constructor(private http: Http) { }

  public ListData() {
    return this.http.get('./assets/data.json').map(res => res.json());
  }
   // method post
   postMethod(data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
   
    return this.http.post(this.baseURL, data, { headers: headers })
      .map(res => res.json());
  }
  setProductDetail(json) {
    localStorage.setItem('prod', JSON.stringify(json));
  }

  getProductDetail() {
    return JSON.parse(localStorage.getItem('prod'));
  }

  getTotalQuantity(){
    let selectedList = this.getProductDetail();
    if(selectedList !== null){
      let total:number = 0;
      for(let m of selectedList){
        total += m.Quantity;
      }
      return total;
    }
    return 0;
  }
  getTotalPrice(){
    let selectedList = this.getProductDetail();
    if(selectedList !== null){
      let total:number = 0;
      for(let m of selectedList){
        total += m.Quantity * m.Price;
      }
      return total;
    }
    return 0;
  }
  clearStorage(){
    localStorage.clear();
  }

}
