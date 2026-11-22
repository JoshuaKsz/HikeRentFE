import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { AuthService } from '../services/auth.service';

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

  }

  onLoginHandler() {
    const formValue = this.loginForm.value;

    this.loginSvc.submitLogin({
      email: formValue.email ?? "",
      password: formValue.password ?? ""
    }).subscribe(
      (response: any) => {
        this.authSvc.setToken(response.data.token);
        this.router.navigate(['/dashboard']);
      }
    );

  }

}