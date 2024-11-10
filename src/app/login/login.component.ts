import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = { username: '', password: '' };
  message: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  login() {
    
    this.userService.login(this.user).subscribe(
      response => {
        console.log('Login successful:', response);

        localStorage.setItem('token', response);  // Store the token
        this.message = 'Login successful!';
        this.router.navigate(['/transactions']); // Navigate to transactions page
      },
      error => {
        console.error('Login failed:', error);
        this.message = 'Invalid username or password. Please try again.';
      }
    );
  }
}
