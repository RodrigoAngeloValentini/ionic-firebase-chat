import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { AngularFireAuth, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AuthService {
  constructor(public auth: AngularFireAuth, public http: Http) {
    console.log('Hello AuthProvider Provider');
  }

  createAuthUser(user: {
    email: string;
    password: string;
  }): firebase.Promise<FirebaseAuthState> {
    return this.auth.createUser(user);
  }
}
