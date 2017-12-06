import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  ngOnInit() {
    // configure firebase
    firebase.initializeApp({
      apiKey: 'AIzaSyBgX0CnmLGEXxIJB2NzsFLSTK89okqIV0M',
      authDomain: 'pickupbasketball-11fc7.firebaseapp.com'
    });
  }
}
