import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestDataService {

  private baseUrl = 'http://localhost:3000/';

  constructor(private _http: HttpClient) { }


  receive(path: string, id?: number) {
    let url: string;
    if (id) {
      url = this.baseUrl + path + '/' + id;
    } else {
      url = this.baseUrl + path;
    }
    return this._http.get(url, { observe: 'response' });

  }

  send(path: string, data) {
    const url = this.baseUrl + path;
    return this._http.post(url, data, { observe: 'response' });
  }

  update(path: string, data) {
    const url = this.baseUrl + path;
    return this._http.put(url, data, { observe: 'response' });
  }
  delete(path: string, id) {
    const url = this.baseUrl + path + '/' + id;
    return this._http.delete(url, { observe: 'response' });
  }

}
