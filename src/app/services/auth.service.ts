import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private platformId = inject(PLATFORM_ID)

  // constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  constructor() { }


  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId)
  }
  
  setToken(token: string) {
    if (!token) {
      console.error('Cannot save an empty token!');
      return;
    }
    localStorage.setItem(
        'auth_token', token
      );

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

  }
}
