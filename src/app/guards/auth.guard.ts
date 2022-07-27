import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router ){}
  async canActivate(): Promise<boolean> {
    const user = await this.auth.getCurrentUser();
    console.log('User: ' + user);
    if (user) {
      return true;
    } else {
      this.router.navigateByUrl('/login', { replaceUrl: true });
        return false;
    }
  }
}
