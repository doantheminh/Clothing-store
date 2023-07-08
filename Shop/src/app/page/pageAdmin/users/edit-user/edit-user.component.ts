import { Component } from '@angular/core';
import { AuthService } from '../../../../service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  user!: any;
  constructor(private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params: any) => {
      const id = Number(params.get('id'));
      this.auth.getUser(id).subscribe((data) => {
        this.user = data;
        this.formEditUser.patchValue({
          email: data.email,
          firstname: data.firstname,
          phone: data.phone
        })
      })
    })

  }
  formEditUser = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    firstname: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    phone: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
  })
  onHandleSubmit() {
    if (confirm('Are you sure you want to update users?')) {
      const user: any = {
        id: this.user.id,
        email: this.formEditUser.value.email || '',
        firstname: this.formEditUser.value.firstname || '',
        phone: this.formEditUser.value.phone || '',

      }
      if (user) {
        this.auth.updateUser(user).subscribe((data) => {
          alert("User updated successfully ")
          this.router.navigate(['/admin/user']);
        })
      }
    }

  }
}
