import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { validateHeaderName } from 'http';
import { PassThrough } from 'stream';
import { LoginService } from '../services/login/login.service';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  loginSvc = inject(LoginService);
  authSvc = inject(AuthService);
  http = inject(HttpClient);
  
  fb = inject(FormBuilder);

  loginForm = this.fb.group({
    email: ["", [
      Validators.required, Validators.email
    ]],
    password: ["",
      [Validators.required, Validators.minLength(8)]
    ]
  });

  ngOnInit(): void {
    console.log("login form", this.loginForm.get("email"));
    console.log("login form", this.loginForm.get("password"));
  }

  userForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  onLoginHandler() {
    const formValue = this.loginForm.value;
    console.log("form value:", formValue);

    this.loginSvc.submitLogin({
      email: formValue.email ?? "",
      password: formValue.password ?? ""
    }).subscribe(
      (response: any) => {
        console.log('FULL LOGIN RESPONSE:', response);
        console.log('TOKEN:', response.data.token);
        this.authSvc.setToken(response.data.token);
        console.log(
          'TOKEN FROM STORAGE:',
          this.authSvc.getToken()
        );

        this.router.navigate(['/dashboard']);
      }
    );

  }

}