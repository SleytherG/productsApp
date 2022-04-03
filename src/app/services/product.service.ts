import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getProducts() {
    const url = `${this.baseUrl}/product/productList`;
    return this.http.get( url );
  }

  addProduct( body: any ) {
    const url = `${this.baseUrl}/product/addProduct`;
    return this.http.post( url, body);
  }

  editProduct( body: any, id: string) {
    const url = `${this.baseUrl}/product/editProduct/${id}`;
    return this.http.put( url , body);
  }

  deleteProduct(  id: string) {
    const url = `${this.baseUrl}/product/deleteProduct/${id}`;
    return this.http.delete( url );
  }
}
