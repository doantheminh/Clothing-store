import { Component } from '@angular/core';
import { ProductsService } from '../../../../service/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent {
  product!: any;
  constructor(private ProductsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params: any) => {
      const id = Number(params.get('id'));
      this.ProductsService.getProduct(id).subscribe((data) => {
        this.product = data;
      })
    })
  }
}
