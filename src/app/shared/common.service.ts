import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CommonService {
  

  constructor(private http: Http) { }

  public ListData() {
    return this.http.get('./assets/data.json').map(res => res.json());
  }

}
