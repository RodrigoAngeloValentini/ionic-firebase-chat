import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// import { AngularFire } from 'angularfire2';

import { User } from './../models/user.model'

@Injectable()
export class UserService {

  // constructor(public af: AngularFire, public http: Http) {
  //   console.log('Hello UserProvider Provider');
  // }

  // create(user: User): firebase.Promise<void> {
  //   return this.af.database.list(`/users`).push(user);
  // }

}
