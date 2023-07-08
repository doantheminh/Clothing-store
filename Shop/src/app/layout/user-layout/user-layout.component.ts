import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent {
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
