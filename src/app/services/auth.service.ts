import { Injectable } from '@angular/core';

import { AuthStateChange, FirebaseAuthentication, User } from '@capacitor-firebase/authentication';
import { Observable, Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { initializeApp } from '@firebase/app';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState  =  new  Subject<AuthStateChange>;

  constructor(private platform: Platform, private router: Router) {
    FirebaseAuthentication.removeAllListeners().then(() => {
      FirebaseAuthentication.addListener('authStateChange', (authState) => {
        console.log(authState);
        this.authState.next(authState);
      });
    });
  }

  async initialize(): Promise<void> {
    if (this.platform.is('capacitor')) {
      return;
    }
    initializeApp(environment.firebase);
  }

  public get authState$(): Observable<AuthStateChange> {
    return this.authState.asObservable();
  }

  async getCurrentUser(): Promise<User | null> {
    const result = await FirebaseAuthentication.getCurrentUser();
    return result.user;
  };

  async signInWithGoogle(): Promise<boolean> {
    const result = await FirebaseAuthentication.signInWithGoogle();
    console.log(result);
    if(result.user) {
      return true;
    } else {
      return false;
    }
  };

  async signOut() {
    await FirebaseAuthentication.signOut();
  };

}
