import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FacebookAuthService } from '../facebook.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = { username: '', password: '' };
  message: string | null = null;

  constructor(private userService: UserService, private router: Router,
    private facebook:FacebookAuthService,
    private http: HttpClient) {}

  login() {
    
    this.userService.login(this.user).subscribe(
      response => {
        console.log('Login successful:', response);

        localStorage.setItem('token', response);  // Store the token
        this.message = 'Login successful!';
        this.router.navigate(['/landing']); // Navigate to transactions page
      },
      error => {
        console.error('Login failed:', error);
        this.message = 'Invalid username or password. Please try again.';
      }
    );
  }
  loginWithFacebook(): void {
    this.facebook.loginWithFacebook()
      .then((accessToken: string) => {
        console.log('Facebook Access Token:', accessToken);
        this.registerWithFacebook(accessToken);
      })
      .catch((error: any) => {
        console.error('Facebook login failed:', error);
      });
  }

  registerWithFacebook(accessToken: string): void {
    const url = 'http://localhost:8080/api/auth/facebook';
    this.http.post(url, { accessToken },{ responseType: 'text' })
      .subscribe({
        next: (response) => {
          localStorage.removeItem('token');
          localStorage.setItem('token', response);  // Store the token
          this.message = 'Login successful!';
          this.router.navigate(['/landing']); 
        },
        error: (error) => {
          console.error('Registration failed:', error);
        }
      });
  }
}
