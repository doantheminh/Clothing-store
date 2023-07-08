import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  carts: any[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;
  constructor(private cartService: CartService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {
    this.cartService.getCarts().subscribe((carts) => {
      this.carts = carts;
      this.totalQuantity = carts.length;
      for (const item of this.carts) {
        this.totalPrice += item.price;
      }
      // this.updateCartInfo();
    });
  }

  removeItem(id: any) {
    if (confirm('Are you sure you want to remove this item?')) {
      this.cartService.removeItem(id).subscribe(() => {
        this.carts = this.carts.filter(c => c.id !== id);
        this.updateCartInfo();
        this.cdRef.detectChanges();
        alert('Removed item successfully')
      });
    }
  }
  updateCartInfo() {
    this.totalQuantity = this.carts.length;
    for (const item of this.carts) {
      this.totalPrice += item.price;
    }
  }


  onClearCartClick() {
    // this.cartService.clearCart().subscribe(
    //   response => {
    //     console.log(response);
    //     // hiển thị thông báo xóa giỏ hàng thành công
    //     alert('Giỏ hàng đã được xóa thành công');
    //   },
    //   error => {
    //     console.log(error);
    //     // hiển thị thông báo lỗi nếu xảy ra lỗi khi xóa giỏ hàng
    //     alert('Đã có lỗi xảy ra khi xóa giỏ hàng');
    //   }
    // );
    this.carts = [];

  }
  checkout() {

    this.router.navigate(['/checkout'])
  }
}