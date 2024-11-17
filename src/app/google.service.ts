import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  private clientId = '1014559456270-p17mctj6262lag4f9r75jp4q8778umso.apps.googleusercontent.com';

  constructor(private authService:UserService,
    private router: Router,
  ) {
    this.loadGoogleSDK();
  }

  
   // Load Google Identity Services SDK
   private loadGoogleSDK() {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => this.initializeGoogleSignIn();
    document.body.appendChild(script);
  }

  // Initialize Google Sign-In
  private initializeGoogleSignIn() {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: this.clientId,
        callback: this.handleCredentialResponse.bind(this),
        ux_mode: 'popup', // Use popup to avoid third-party cookie issues
        auto_select: false, // Do not auto-login to prevent cookie dependence
      });
    } else {
      console.error('Google API not loaded');
    }
  }

  // Trigger the Google Sign-In popup
  public loginWithGoogle() {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.prompt(); // Display the One Tap or Sign-In popup
    }
  }

  // Handle the response from Google
  private handleCredentialResponse(response: any) {
    console.log('Google login response:', response.credential);
    // Here you can send the JWT token to your backend
    const token = response.credential;

    // Send the token to your backend for verification
    this.authService.registerWithGoogle(token);
  }

  

}
