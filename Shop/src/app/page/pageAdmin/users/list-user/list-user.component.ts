import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent {
  user!: any[];
  page: number = 1;

  filteredUser!: any[];
  query!: string;
  constructor(private auth: AuthService) {
    this.loadProducts();
  }
  onRemove(id: any) {
    this.auth.removetUser(id).subscribe((data) => {
      this.user = this.user.filter((user) => user.id !== id);
    })
  }

  loadProducts(): void {
    this.auth.getUsers().subscribe(
      (data) => {
        this.user = data;
        this.filterProducts();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  filterProducts(): void {
    if (!this.query) {
      this.filteredUser = this.user;
    } else {
      this.filteredUser = this.user.filter(data => {
        return data.email.toLowerCase().includes(this.query.toLowerCase());
      });
    }
  }

  search(): void {
    this.filterProducts();
  }

}

