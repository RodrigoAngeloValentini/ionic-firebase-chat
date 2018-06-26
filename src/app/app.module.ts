import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';

import {
  AngularFireModule,
  FirebaseAppConfig,
  AuthProviders,
  AuthMethods,
} from 'angularfire2';
import { UserService } from '../providers/user.service';
import { AuthService } from '../providers/auth.service';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: 'AIzaSyBXJqMfEckh1Q_OFVD5wpZzGGtq8699cNc',
  authDomain: 'ionic2-firebase-chart-48cee.firebaseapp.com',
  databaseURL: 'https://ionic2-firebase-chart-48cee.firebaseio.com',
  storageBucket: 'ionic2-firebase-chart-48cee.appspot.com',
  messagingSenderId: '967451678230',
};

const firebaseAuthConfig = {
  provider: AuthProviders.Custom,
  method: AuthMethods.Password,
};

@NgModule({
  declarations: [MyApp, HomePage, SignupPage, SigninPage],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig, firebaseAuthConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, SignupPage, SigninPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    UserService,
  ],
})
export class AppModule {}
