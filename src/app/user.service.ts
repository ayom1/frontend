// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient,private router: Router) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    localStorage.removeItem('token');
    return this.http.post(`${this.baseUrl}/login`, user,{ responseType: "text"});
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  getUserRoles(): any[] {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.roles || [];
    }
    return [];
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  
  isAdmin(): boolean {
    const roles = this.getUserRoles();
    const roleNames = roles.map(role => role.authority || role.getAuthority());
    console.log(roleNames); // Debugging line to check the list of roles

    if (roleNames.includes('ROLE_ADMIN')) {
        console.log("User has admin role");
    }

    return roleNames.includes('ROLE_ADMIN');
  }  
  public registerWithGoogle(token: string): void {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers.set('responseType','text');
    //this.http.post<any>(this.baseUrl+'/google', { token }, { headers });
    const url = this.baseUrl+'/google';
    this.http.post(url, { token },{ responseType: 'text' })
      .subscribe({
        next: (response) => {
          localStorage.removeItem('token');
          localStorage.setItem('token', response);  // Store the token
          //this.message = 'Login successful!';
          this.router.navigate(['/landing']); 
        },
        error: (error) => {
          console.error('Registration failed:', error);
        }
      });
  }
}
