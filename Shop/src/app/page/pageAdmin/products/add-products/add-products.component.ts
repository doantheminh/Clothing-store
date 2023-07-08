import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../../../../service/products.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  category: any[] = [];
  files: any[] = [];
  url: any = []
  size: string[] = ["M", "S", "L", "XL"];
  color: string[] = ["Red", "Blue", "Orange", "Yellow"];

  constructor(private fb: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.categoryService.getCategorys().subscribe((data) => {
      this.category = data;
    })
  }

  formAddProduct = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(40)]],
    price: [0, [Validators.required, Validators.min(10), Validators.max(9999)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(120)]],
    color: ['', [Validators.required]],
    size: ['', [Validators.required]],
    count: [0, [Validators.required, Validators.minLength(1), Validators.maxLength(9999), Validators.min(1)]],
    categoryId: ['', [Validators.required]],
    images: [''],
  })

  onSelectImage(event: any) {
    this.files.push(...event.addedFiles);
    const file_data = this.files[0]
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'upload');
    data.append('cloud_name', 'doa7mkkpq');
    this.productsService.uploadImage(data).subscribe(response => {
      this.url.push(response.secure_url)
    })
  }

  onRemovem(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onHandleSubmit() {
    if (confirm('Are you sure you want add products ')) {
      const product: any = {
        name: this.formAddProduct.value.name || "",
        price: this.formAddProduct.value.price || 0,
        description: this.formAddProduct.value.description || "",
        images: this.url[0] || "",
        categoryId: this.formAddProduct.value.categoryId || "",
        count: this.formAddProduct.value.count || 0,
        size: this.formAddProduct.value.size || "",
        color: this.formAddProduct.value.color || "",
      }

      this.productsService.addProduct(product).subscribe((data) => {
        alert('Product added successfully!!!')
        // Lấy ID của sản phẩm vừa tạo và gán vào categoryId
        const productId = data.id;
        this.formAddProduct.patchValue({
          categoryId: productId
        });
        this.router.navigate(['admin/products'])
      }, (err => {
        alert('Add Product Failed !!')
      })
      )
    }
  }

}