import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';
import { CategoryService } from '../../../service/category.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product!: any;
  categoryName!: string;
  user = localStorage.getItem('user');
  constructor(
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {
    this.route.paramMap.subscribe((params: any) => {
      const id = Number(params.get('id'));
      this.productsService.getProduct(id).subscribe((data) => {
        this.product = data;
        //lấy tên categories
        this.categoryName = data.categoryId;
        const idCat = data.categoryId;
        this.categoryService.getCategory(idCat).subscribe((data) => {
          this.categoryName = data.name
        });
      })
    })
  }

  addToCart() {
    this.user = localStorage.getItem('user');
    if (!this.user) {
      alert('Bạn chưa đang nhập !');
      this.router.navigate(['/signin'])
    } else {
      this.cartService.getCarts().subscribe((items) => {
        const productExists = items.find(item => item.id === this.product.id);
        if (productExists) {
          alert('Sản phẩm đã tồn tại trong giỏ hàng');
        } else {
          this.cartService.addCarts(this.product).subscribe((response) => {
            alert('Bạn đã thêm sản phẩm vào giỏ hàng thành công!');
            this.router.navigate(['/cart']);
          });
        }
      });
    }

  }
}