import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {

  }

  async signInWithGoogle() {
    await this.auth.signInWithGoogle().then(async (isSignedIn: boolean) => {
      if(isSignedIn) {
        await this.router.navigateByUrl('/', { replaceUrl: true });
      }
    });
  }

}
