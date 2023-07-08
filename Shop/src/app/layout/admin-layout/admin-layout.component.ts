import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  user = localStorage.getItem('user');
  firstname = localStorage.getItem('firstname');
  email = localStorage.getItem('email');
  id = localStorage.getItem('id');
  logout() {
    localStorage.removeItem('firstname');
    localStorage.removeItem('email');
    localStorage.removeItem('user');
    localStorage.removeItem('id');


  }
}
