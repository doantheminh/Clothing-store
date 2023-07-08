import { Component } from '@angular/core';
import { ProductsService } from '../../../service/products.service';

@Component({
  selector: 'app-hom-page',
  templateUrl: './hom-page.component.html',
  styleUrls: ['./hom-page.component.css']
})
export class HomPageComponent {
  products!: any[];
  page: number = 1

  filteredProducts!: any[];
  query!: string;

  constructor(private ProductsService: ProductsService) {
    this.loadProducts();
  }

  loadProducts(): void {
    this.ProductsService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.filterProducts();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  filterProducts(): void {
    if (!this.query) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => {
        return product.name.toLowerCase().includes(this.query.toLowerCase());
      });
    }
  }

  search(): void {
    this.filterProducts();
  }

}
