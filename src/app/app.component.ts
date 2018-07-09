import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { User } from '../models/user.model';
import { AuthService } from '../providers/auth.service';
import { UserService } from '../providers/user.service';
import { FirebaseAuthState } from 'angularfire2';
// import { SignupPage } from '../pages/signup/signup';
// import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage: any = SigninPage;
  currentUser: User;

  constructor(
    authService: AuthService,
    userService: UserService,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
  ) {
    authService.auth.subscribe((authState: FirebaseAuthState) => {
      if (authState) {
        userService.currentUser.subscribe((user: User) => {
          this.currentUser = user;
        });
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
