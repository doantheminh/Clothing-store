import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: any[] = [];
  constructor(private http: HttpClient) { }
  getCarts(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/carts')
  }
  addCarts(cart: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/carts`, cart)
  }
  removeItem(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/carts/${id}`)
  }
  updateCartItem(item: any) {
    return this.http.put(`http://localhost:3000/carts/${item.id}`, item);
  }

  createOrder(order: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/orders`, order)
  }
  getOrder(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/orders/${id}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete<any>('http://localhost:3000/carts', {});
  }


}
