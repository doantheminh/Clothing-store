import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent {
  category: any[] = [];
  files: any[] = [];
  url: any = []
  size: string[] = ["M", "S", "L", "XL"];
  color: string[] = ["Red", "Blue", "Orange", "Yellow"];
  product!: any

  constructor(private fb: FormBuilder,
    private ProductsService: ProductsService,
    private Router: Router,
    private CategoryService: CategoryService,
    private route: ActivatedRoute
  ) {
    this.CategoryService.getCategorys().subscribe((data) => {
      this.category = data;

    })
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.ProductsService.getProduct(id).subscribe((data) => {
        this.product = data
        this.formAddProduct.patchValue({
          name: data.name,
          price: data.price,
          description: data.description,
          images: data.images,
          categoryId: data.categoryId,
          count: data.count,
          size: data.size,
          color: data.color
        })
      });
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
    images: ['', [Validators.required]],
  })
  onSelectImage(event: any) {
    this.files.push(...event.addedFiles);
    const file_data = this.files[0]
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'upload');
    data.append('cloud_name', 'doa7mkkpq');
    this.ProductsService.uploadImage(data,
    ).subscribe(response => {
      this.url.push(response.secure_url)
      console.log(this.url);
    }
    )
  }
  onRemovem(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  onHandleSubmit() {
    if (confirm('Are you sure you want add products ')) {
      const product: any = {
        id: this.product.id,
        name: this.formAddProduct.value.name || "",
        price: this.formAddProduct.value.price || 0,
        description: this.formAddProduct.value.description || "",
        images: this.url[0] || "",
        categoryId: this.formAddProduct.value.categoryId || "",
        count: this.formAddProduct.value.count || 0,
        size: this.formAddProduct.value.size || "",
        color: this.formAddProduct.value.color || "",
      }
      if (product) {
        this.ProductsService.editProduct(product).subscribe((data) => {
          alert('Product added successfully!!!')
          this.Router.navigate(['admin/products'])
        }, (err => {
          alert('Add Product Failed !!')
        })
        )
      }

    }

  }
}
