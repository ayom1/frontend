// facebook-auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacebookAuthService {

  constructor() {
    // Load Facebook SDK
    // window.fbAsyncInit = () => {
    //   window.FB.init({
    //     appId: '1542765653271392',//'YOUR_FACEBOOK_APP_ID', // Replace with your Facebook App ID
    //     cookie: true,
    //     xfbml: true,
    //     version: 'v17.0'
    //   });
    // };
    // Initialize the Facebook SDK asynchronously
    this.loadFacebookSDK(); // Load the SDK when the service is instantiated
  }
   // Function to load Facebook SDK
   private loadFacebookSDK(): void {
    console.log('Starting to load Facebook SDK...');

    // Define the SDK initialization function
    window.fbAsyncInit = () => {
      if (window.FB) {
        console.log('Initializing Facebook SDK...');
        window.FB.init({
          appId: '1542765653271392', // Replace with your Facebook App ID
          cookie: true,
          xfbml: true,
          version: 'v17.0',
        });
        console.log('Facebook SDK Initialized');
      } else {
        console.error('Facebook SDK not loaded yet.');
      }
    };
   

    // Dynamically load the Facebook SDK script
    ((d, s, id) => {
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        const js = d.createElement(s) as HTMLScriptElement;
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        js.onload = () => {
          console.log('Facebook SDK script loaded.');
          if (typeof window.FB === 'undefined') {
            console.error('Failed to load Facebook SDK.');
          }else{
            console.log('not null ');
          }
        };
        console.log('before ');

        fjs.parentNode?.insertBefore(js, fjs);
        console.log('after ');

      })(document, 'script', 'facebook-jssdk');
    
  }

  loginWithFacebook(): Promise<any> {
    return new Promise((resolve, reject) => {
      window.FB.login((response: any) => {
        if (response.authResponse) {
          resolve(response.authResponse.accessToken);
        } else {
          reject('User cancelled login or did not fully authorize.');
        }
      }, { scope: 'public_profile,email' });
    });
  }
}
