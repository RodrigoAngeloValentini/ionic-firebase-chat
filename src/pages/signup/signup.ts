import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  NavController,
  NavParams,
  Loading,
  LoadingController,
  AlertController,
} from 'ionic-angular';
import { FirebaseAuthState } from 'angularfire2';
import 'rxjs/add/operator/first';

import { AuthService } from './../../providers/auth.service';
import { UserService } from './../../providers/user.service';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signupForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userService: UserService,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
  ) {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
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
    let formUser = this.signupForm.value;
    let username: string = formUser.username;

    this.userService
      .userExists(username)
      .first()
      .subscribe((userExists: boolean) => {
        if (!userExists) {
          this.authService
            .createAuthUser({
              email: formUser.email,
              password: formUser.password,
            })
            .then((authState: FirebaseAuthState) => {
              delete formUser.password;
              let uuid: string = authState.auth.uid;

              this.userService
                .create(formUser, uuid)
                .then(() => {
                  console.log('Usuário cadastrado com sucesso!');
                  this.navCtrl.setRoot(HomePage);
                  loading.dismiss();
                })
                .catch((error: any) => {
                  console.log(error);
                  loading.dismiss();
                  this.showAlert(error);
                });
            })
            .catch((error: any) => {
              console.log(error);
              loading.dismiss();
              this.showAlert(error);
            });
        } else {
          this.showAlert(
            `O username ${username} já está sendo usado em outra conta`,
          );
          loading.dismiss();
        }
      });
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
}
