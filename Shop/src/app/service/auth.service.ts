import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  signup(user: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/signup`, user)
  }
  signin(user: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/signin`, user)
  }
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/users`)
  }
  getUser(id: any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/users/${id}`)
  }
  removetUser(id: any): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/users/${id}`)
  }
  updateUser(user: any): Observable<any> {
    return this.http.patch<any>(`http://localhost:3000/users/${user.id}`, user)
  }
  isAuthenticated() {
    return JSON.parse(localStorage.getItem('user')!) || null;
  }
}
