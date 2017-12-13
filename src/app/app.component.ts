import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import * as firebase from 'firebase';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    // configure firebase
    firebase.initializeApp({
      apiKey: 'AIzaSyBgX0CnmLGEXxIJB2NzsFLSTK89okqIV0M',
      authDomain: 'pickupbasketball-11fc7.firebaseapp.com'
    });
  }
}
