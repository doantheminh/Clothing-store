import { Component } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { tap, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent {
  category!: any[];
  page: number = 1;

  filteredCategorys!: any[];
  query!: string;
  constructor(private categorys: CategoryService
  ) {
    // this.categorys.getCategorys().subscribe((data) => {
    //   this.category = data;

    // })
    this.loadProducts()
  }
  onRemoveCategory(id: number) {

    if (confirm('Are you sure you want to remove this category')) {
      this.categorys.removeCategory(id).subscribe((data) => {
        this.category = this.category.filter(c => c.id !== id)
        alert('Category removed successfully !!!')
        console.log(data.id);

        // Xóa tất cả sản phẩm trong danh mục
        this.categorys.removeProductByCat(id).subscribe((data) => {
          console.log('All products in category removed successfully !!!');
        });
      })
    }
  }


  loadProducts(): void {
    this.categorys.getCategorys().subscribe(
      (data) => {
        this.category = data;
        this.filterProducts();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  filterProducts(): void {
    if (!this.query) {
      this.filteredCategorys = this.category;
    } else {
      this.filteredCategorys = this.category.filter(data => {
        return data.name.toLowerCase().includes(this.query.toLowerCase());
      });
    }
  }

  search(): void {
    this.filterProducts();
  }

}
