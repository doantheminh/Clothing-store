import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  carts!: any[];
  totalPrice: number = 0;
  phone!: any;
  email!: any;
  firstname!: any;
  lastname!: any;

  constructor(private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cart: CartService
  ) {
    this.getCart();

  }
  getCart() {
    const user = localStorage.getItem('user');
    if (user !== null) {
      const userObject = JSON.parse(user);
      this.email = userObject.user.email;
      this.firstname = userObject.user.firstname;
      this.lastname = userObject.user.lastname;
      this.phone = userObject.user.phone;



    } else {
      console.log('Không tìm thấy giá trị user trong localStorage');
    }


    this.cart.getCarts().subscribe((data) => {
      this.carts = data;
      for (const item of this.carts) {
        this.totalPrice += item.price;

      }
    })

  }
  submitOrder() {
    const order = {
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      phone: this.phone,
      carts: this.carts,
      totalPrice: this.totalPrice
    }
    this.cart.createOrder(order).subscribe((response) => {
      const orderId = response.id;
      this.router.navigate(['/oder', orderId]);
    }, (error) => {
      console.log('Lỗi khi tạo đơn hàng: ', error);
    });
  }
}
