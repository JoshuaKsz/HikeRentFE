import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  // private platformId = Inject(PLATFORM_ID)

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId)
  }
  
  setToken(token: string) {
    if (!token) {
      console.error('Cannot save an empty token!');
      return;
    }
    console.log("setting it");
    console.log("token value:", token);
    localStorage.setItem(
        'auth_token', token
      );

    console.log("token after setting:", this.getToken());
  }
    
    getToken(): string | null {
      if (!isPlatformBrowser(this.platformId)) {
        return null;
      }
    return localStorage.getItem('auth_token');
  }

  clearToken() {

    if (!this.isBrowser()) return;

    localStorage.removeItem('auth_token');

    console.log(
      'Token after logout:',
      localStorage.getItem('auth_token')
    );
  }
}
