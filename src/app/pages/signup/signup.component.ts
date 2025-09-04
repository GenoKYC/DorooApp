import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastComponent],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  message = ''; // ✅ put this back
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup() {
    this.authService
      .register({
        name: this.name,
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (res) => {
          this.showToast('✅ Signup successful! Redirecting...', 'success');
          console.log(res);

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500); // wait 1.5s before redirect
        },
        error: (err) => {
          this.showToast('❌ Signup failed. Try again.', 'error');
          console.error(err);
        },
      });
  }

  private showToast(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => (this.toastMessage = ''), 2500); // hide after 2.5s
  }
}
