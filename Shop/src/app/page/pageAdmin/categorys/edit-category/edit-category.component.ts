import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent {
  submitted: boolean = false;
  category!: any;
  constructor(private categorys: CategoryService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params: any) => {
      const id = Number(params.get('id'));
      this.categorys.getCategory(id).subscribe((data) => {
        this.category = data;
        this.formCategory.patchValue({
          name: data.name,
        })
      })

    })
  }
  formCategory = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
  })
  onHandleSubmit() {
    this.submitted = true;
    const category: any = {
      id: this.category.id,
      name: this.formCategory.value.name || '',
    }
    if (category) {
      this.categorys.editCategory(category).subscribe((data) => {
        alert('Category added successfully!!!'),
          this.router.navigate(['admin/category'])
      })
    }
    return null
  }
}
