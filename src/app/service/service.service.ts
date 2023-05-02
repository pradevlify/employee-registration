import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}
  allproducts = [];
  creatProduct(product: any) {
    const myheaders = new HttpHeaders({ myheading: 'employee' });
    this.http
      .post(
        'https://sixapril-5b2b4-default-rtdb.firebaseio.com/product.json',
        product,
        { headers: myheaders }
      )
      .subscribe((res) => console.log(res));
  }

  getProduct() {
    return this.http
      .get('https://sixapril-5b2b4-default-rtdb.firebaseio.com/product.json')
      .pipe(
        map((res) => {
          const products = [];
          for (let key in res) {
            products.push({ ...res[key], id: key });
          }
          return products;
        })
      );
  }
  delete(id: any) {
    this.http
      .delete(
        'https://sixapril-5b2b4-default-rtdb.firebaseio.com/product/' +
          id +
          '.json'
      )
      .subscribe();
  }
  deleteAll() {
    this.http
      .delete('https://sixapril-5b2b4-default-rtdb.firebaseio.com/product.json')
      .subscribe();
  }
  update(id: any, value: any) {
    this.http
      .put(
        'https://sixapril-5b2b4-default-rtdb.firebaseio.com/product/' +
          id +
          '.json',
        value
      )
      .subscribe();
  }
}
