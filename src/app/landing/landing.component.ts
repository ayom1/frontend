import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  isAdmin: boolean;
  constructor(private userService: UserService,private router: Router) {
    this.isAdmin = this.userService.isAdmin();
  }

  logout() {
    localStorage.removeItem('token');  // Remove JWT token
    this.router.navigate(['/login']);  // Redirect to login page
  }
}
