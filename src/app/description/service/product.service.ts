import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _url: string = 'https://fakestoreapi.com/products/1';
  constructor(private http: HttpClient) { }

  getData (): Observable<any> {
    return this.http.get(this._url)
  }
}
