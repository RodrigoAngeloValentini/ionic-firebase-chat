import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { ChatPage } from '../pages/chat/chat';
import { HomePage } from '../pages/home/home';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { UserProfilePage } from '../pages/user-profile/user-profile';

import {
  AngularFireModule,
  FirebaseAppConfig,
  AuthProviders,
  AuthMethods,
} from 'angularfire2';
import { UserService } from '../providers/user.service';
import { AuthService } from '../providers/auth.service';

import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { ChatService } from '../providers/chat.service';
import { MessageService } from '../providers/message.service';

import { MessageBoxComponent } from '../components/message-box/message-box.component';
import { CustomLoggedHeaderComponent } from '../components/custom-logged-header/custom-logged-header.component';
import { UserInfoComponent } from '../components/user-info/user-info.component';
import { UserMenuComponent } from '../components/user-menu/user-menu.component';

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
  declarations: [
    CapitalizePipe,
    ChatPage,
    CustomLoggedHeaderComponent,
    MessageBoxComponent,
    UserMenuComponent,
    UserInfoComponent,
    MyApp,
    HomePage,
    SignupPage,
    SigninPage,
    UserProfilePage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig, firebaseAuthConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChatPage,
    MyApp,
    HomePage,
    SignupPage,
    SigninPage,
    UserProfilePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    UserService,
    ChatService,
    MessageService,
  ],
})
export class AppModule {}
