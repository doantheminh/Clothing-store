import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  formSubmitted: boolean = false;

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }
  formSignin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],

  })

  onHandleSubmit() {
    this.formSubmitted = true;

    if (this.formSignin.value) {
      this.auth.signin(this.formSignin.value).subscribe(
        (data) => {
          localStorage.setItem('user', JSON.stringify(data));
          localStorage.setItem('firstname', JSON.stringify(data.user.firstname));
          localStorage.setItem('email', JSON.stringify(data.user.email));
          localStorage.setItem('id', JSON.stringify(data.user.id));




          alert('Hello ' + data.user.firstname + ', welcome to my website');
          this.router.navigate(['/']);
        },
        (error) => {
          alert('Signup failed because email of password is incorrect');
        }
      );
    }
  }

}
