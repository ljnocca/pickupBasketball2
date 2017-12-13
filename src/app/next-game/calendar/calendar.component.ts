import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {AuthService} from '../../auth/auth.service';
import {Http, Response} from '@angular/http';
import * as firebase from 'firebase';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  daysAdded: number;
  gameDay;
  gameTime;
  currentHour;
  today;
  @Input() players;
  token;

  constructor(private authService: AuthService,
              private http: Http) { }

  ngOnInit() {
    this.token = this.authService.getToken();
    this.currentHour = moment().get('hour');

    this.today = moment().format('d');

    if (this.today === '0') {
      // SUNDAY
      this.daysAdded = 2;
      this.gameTime = '6:30 AM';
    } else if (this.today === '1') {
      // MONDAY
      this.daysAdded = 1;
      this.gameTime = '6:30 AM';
    } else if (this.today === '2') {
      // TUESDAY
      this.daysAdded = 0;
      this.gameTime = '6:30 AM';
      if (this.currentHour > 8) {
        this.daysAdded = 2;
        this.gameTime = '6:30 AM';
      }
    } else if (this.today === '3') {
      // WEDNESDAY
      this.daysAdded = 1;
      this.gameTime = '6:30 AM';
    } else if (this.today === '4') {
      // THURSDAY
      this.daysAdded = 0;
      this.gameTime = '6:30 AM';
      if (this.currentHour > 8) {
        this.daysAdded = 2;
        this.gameTime = '7:30 AM';
      }
    } else if (this.today === '5') {
      // FRIDAY
      this.daysAdded = 1;
      this.gameTime = '7:30 AM';
    } else if (this.today === '6') {
      // SATURDAY
      this.daysAdded = 0;
      this.gameTime = '7:30 AM';
      if (this.currentHour > 9) {
        this.daysAdded = 3;
        this.gameTime = '6:30 AM';
      }
    }

    this.gameDay = moment().add(this.daysAdded, 'days').format('dddd, MMMM Do');
  }

}
