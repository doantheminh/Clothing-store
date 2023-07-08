import { Component } from '@angular/core';
import { ProductsService } from '../../../../service/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent {
  products!: any[];

  filteredProducts!: any[];
  query!: string;
  // limt +Page
  page: number = 1;
  constructor(private ProductsService: ProductsService,
    private Router: Router
  ) {
    this.loadProducts();
  }

  //delete product
  onRemoveProduct(id: number) {
    if (confirm('Are you sure you want to remove this product?')) {
      this.ProductsService.removeProduct(id).subscribe((data) => {
        this.products = this.products.filter((products => products.id !== id))
        alert('Product removed successfully!!!')
      });
    }

  }
  //Search for products 
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
