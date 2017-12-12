import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public showPassword: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password);
  }

  resetPassword(email) {
    const auth = firebase.auth();

    auth.sendPasswordResetEmail(email.value)
      .then(() => {
      alert('email has been sent');
    }).catch(() => {
      alert('an error occurred, please try again');
    });

  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

}
