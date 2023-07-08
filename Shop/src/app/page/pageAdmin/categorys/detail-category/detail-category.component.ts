import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.css']
})
export class DetailCategoryComponent {
  product!: any;
  products!: any;
  test: any[] = []
  page: number = 1;

  constructor(private ProductsService: ProductsService,
    private CategoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params: any) => {
      const id = Number(params.get('id'));
      this.CategoryService.getCategory(id).subscribe((data) => {
        this.product = data;
        this.CategoryService.getProductByCat(id).subscribe((data) => {
          this.test = data;
        });
      })
    })
  }

}
