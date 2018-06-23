import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { User } from './../models/user.model';

@Injectable()
export class UserService {
  users: FirebaseListObservable<User[]>;

  constructor(public af: AngularFire, public http: Http) {
    this.users = this.af.database.list(`users`);
  }

  create(user: User): firebase.Promise<void> {
    return this.users.push(user);
  }
}
