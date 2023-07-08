import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(private http: HttpClient) { }
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/products')
  }
  getProduct(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/products/${id}`)
  }
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/products`, product)
  }
  removeProduct(id: any): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/products/${id}`)
  }
  editProduct(product: any): Observable<any> {
    return this.http.patch<any>(`http://localhost:3000/products/${product.id}`, product)
  }

  uploadImage(vals: any): Observable<any> {
    {
      let data = vals;
      return this.http.post(`https://api.cloudinary.com/v1_1/doa7mkkpq/image/upload`, data)
    }
  }

}
