import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts() {
    const url = `http://localhost:8090/product/productList`;
    return this.http.get( url );
  }

  addProduct( body: any ) {
    const url = `http://localhost:8090/product/addProduct`;
    return this.http.post( url, body);
  }

  editProduct( body: any, id: string) {
    const url = `http://localhost:8090/product/editProduct/${id}`;
    return this.http.put( url , body);
  }

  deleteProduct(  id: string) {
    const url = `http://localhost:8090/product/deleteProduct/${id}`;
    return this.http.delete( url );
  }
}
