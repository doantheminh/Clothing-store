import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import * as bcrypt from 'bcryptjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  formSubmitted: boolean = false;
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }
  formSignup = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
    lastname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    confirmpassword: ['', [Validators.required]]

  }, { validators: this.checkPasswords })
  checkPasswords(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmpassword = form.get('confirmpassword')?.value;
    if (password === confirmpassword) return null;
    return { notMatch: true };
  }
  onHandleSubmit() {
    this.formSubmitted = true;

    if (this.formSignup.valid) {
      const salt = bcrypt.genSaltSync(10);
      const confirmpassword = this.formSignup.get('confirmpassword')?.value;
      const hashedConfirmPassword = bcrypt.hashSync(confirmpassword, salt);

      // Gửi hashedPassword và hashedConfirmPassword đến máy chủ
      this.auth.signup({ ...this.formSignup.value, confirmpassword: hashedConfirmPassword }).subscribe((data) => {
        alert('Signup successful '),
          this.router.navigate(['/signin']);
      }, (err => {
        alert('Signup failed ')
      }))
    }
  }

}
