import { Component } from '@angular/core';
import {
  AlertController,
  Loading,
  LoadingController,
  NavController,
  NavParams,
} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupPage } from '../signup/signup';
import { AuthService } from '../../providers/auth.service';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  signinForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
  ) {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.signinForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(emailRegex),
        ]),
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    let loading: Loading = this.showLoading();

    this.authService
      .signinWithEmail(this.signinForm.value)
      .then((isLogged: boolean) => {
        if (isLogged) {
          this.navCtrl.setRoot(HomePage);
          loading.dismiss();
        }
      })
      .catch((error: any) => {
        loading.dismiss();
        this.showAlert(error);
      });
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });

    loading.present();

    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl
      .create({
        message: message,
        buttons: ['OK'],
      })
      .present();
  }

  onHomePage(): void {
    this.navCtrl
      .push(HomePage)
      .then((hasAccess: boolean) => {
        console.log('Autorizado: ', hasAccess);
      })
      .catch(err => {
        console.log('Não autorizado: ', err);
      });
  }

  onLogout(): void {
    this.authService.logout();
  }
}
