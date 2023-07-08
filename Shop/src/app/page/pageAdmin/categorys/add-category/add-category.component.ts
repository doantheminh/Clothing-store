import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  submitted: boolean = false;
  constructor(private categorys: CategoryService,
    private fb: FormBuilder,
    private router: Router
  ) { }
  formCategory = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
  })
  onHandleSubmit() {
    this.submitted = true;
    if (this.formCategory.valid) {
      this.categorys.addCategory(this.formCategory.value).subscribe((data) => {
        alert('Category added successfully!!!'),
          this.router.navigate(['admin/category'])
      })
    }
    return null
  }
}
