import { Component } from '@angular/core';
import { CartService } from '../../../service/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent {
  order: any;
  totalQuantity: number = 0;
  totalPrice: number = 0;

  constructor(private cart: CartService,
    private route: ActivatedRoute) {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cart.getOrder(id).subscribe((data) => {
      this.order = data;
      this.totalQuantity = this.order.carts.length;

      for (const item of this.order.carts) {
        this.totalPrice += item.price;
      }
    }, (error) => {
      console.log('Lỗi khi lấy thông tin đơn hàng: ', error);
    });

  }

}

