import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    console.log('Login clicked');
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: (res) => {
          // ✅ Save token
          if (res.token) {
            localStorage.setItem('token', res.token);
          }

          // ✅ Redirect to landing
          this.router.navigate(['/landing']);
        },
        error: (err) => {
          this.errorMessage = '❌ Login failed. Please check your credentials.';
          console.error('Login error:', err);
        },
      });
  }
}
