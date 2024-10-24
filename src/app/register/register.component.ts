// register.component.ts
import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = { username: '', password: '', email: '' };
  message: string | null = null;  // Declare message property

  constructor(private userService: UserService) {}

  register() {
    this.userService.register(this.user).subscribe(response => {
      console.log('User registered:', response);
    });
  }
}
