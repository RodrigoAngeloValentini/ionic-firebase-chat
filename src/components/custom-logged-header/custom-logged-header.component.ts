import { Component, Input } from '@angular/core';

import { AlertController, App, MenuController } from 'ionic-angular';

import { BaseComponent } from '../base.component';
import { AuthService } from '../../providers/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'custom-logged-header',
  templateUrl: 'custom-logged-header.component.html',
})
export class CustomLoggedHeaderComponent extends BaseComponent {
  @Input() title: string;
  @Input() user: User;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public app: App,
    public menuCtrl: MenuController,
  ) {
    super(alertCtrl, authService, app, menuCtrl);
  }
}
