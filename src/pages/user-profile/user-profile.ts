import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../providers/auth.service';
import { UserService } from '../../providers/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  currentUser: User;
  canEdit: boolean = false;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {}

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.userService.currentUser.subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.editUser();
  }

  private editUser(photoUrl?: string): void {
    this.userService
      .edit({
        name: this.currentUser.name,
        username: this.currentUser.username,
        photo: photoUrl || this.currentUser.photo || '',
      })
      .then(() => {
        this.canEdit = false;
      });
  }
}
