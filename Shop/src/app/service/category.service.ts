import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categorys: any[] = [];
  constructor(private http: HttpClient) { }
  getCategorys(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/categorys')
  }
  getCategory(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/categorys/${id}`)
  }
  addCategory(category: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/categorys`, category)
  }
  removeCategory(id: any): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/categorys/${id}`)
  }

  editCategory(category: any): Observable<any> {
    return this.http.patch<any>(`http://localhost:3000/categorys/${category.id}`, category)
  }
  getProductByCat(categoryId: any): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/products?categoryId=' + categoryId)
  }
  removeProductByCat(categoryId: any): Observable<any[]> {
    return this.http.delete<any[]>('http://localhost:3000/products?categoryId=' + categoryId)
  }
}
