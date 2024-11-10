// register.component.ts
import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = { username: '', password: '', email: '' };
  message: string | null = null;  // Declare message property

  constructor(private userService: UserService, private router: Router) {}

  register() {
    this.userService.register(this.user).subscribe(response => {
      console.log('User registered:', response);
      this.userService.login(this.user).subscribe(
        response => {
          console.log('Login susccessful:', response);
          localStorage.removeItem('token');
          localStorage.setItem('token', response);  // Store the token
          this.message = 'Login successful!';
          this.router.navigate(['/transactions']); // Navigate to transactions page
        },
        error => {
          console.error('Login failed:', error);
          this.message = 'Invalid username or password. Please try again.';
        }
      );

    },
    error => {
      console.error('registered failed:', error);
      this.message = 'registered failed.';
    });
  }
}
