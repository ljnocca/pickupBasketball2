import {Component, Input, OnChanges, OnInit} from '@angular/core';
import * as moment from 'moment';
import {AuthService} from '../../auth/auth.service';
import {Http, Response} from '@angular/http';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {

  daysAdded: number;
  gameDay;
  gameTime;
  today;
  @Input() players;
  token: string;

  constructor(private authService: AuthService,
              private http: Http) { }

  ngOnInit() {
    this.token = this.authService.getToken();
    console.log(this.token);
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
    } else if (this.today === '3') {
      // WEDNESDAY
      this.daysAdded = 1;
      this.gameTime = '6:30 AM';
    } else if (this.today === '4') {
      // THURSDAY
      this.daysAdded = 0;
      this.gameTime = '6:30 AM';
    } else if (this.today === '5') {
      // FRIDAY
      this.daysAdded = 1;
      this.gameTime = '7:30 AM';
    } else if (this.today === '6') {
      // SATURDAY
      this.daysAdded = 0;
      this.gameTime = '7:30 AM';
    }

    this.gameDay = moment().add(this.daysAdded, 'days').format('dddd, MMMM Do');
  }

  ngOnChanges() {
    if (this.today === '0') {
      // SUNDAY
      // TODO remove the below if statment (just testing)
      if (moment().get('hour') > 12) {
        this.resetPlayersStatus()
      }
    } else if (this.today === '2') {
      // TUESDAY
      // RESET STATUS ON GAMEDAY AFTER NOON
      if (moment().get('hour') > 12) {
        this.resetPlayersStatus()
      }
    } else if (this.today === '4') {
      // THURSDAY
      if (moment().get('hour') > 12) {
        this.resetPlayersStatus()
      }
    } else if (this.today === '6') {
      // SATURDAY
      if (moment().get('hour') > 12) {
        this.resetPlayersStatus()
      }
    }
  }

  resetPlayersStatus() {
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].status = 'OUT';
    }
    // TODO PREVENT RESET FROM PERFORMING MANY TIMES ON SAME DAY
    // this.http.put('https://pickupbasketball-11fc7.firebaseio.com/players.json?auth=' + this.token, this.players)
    //   .subscribe(
    //     (putResponse: Response) => {
    //       console.log('Players status has been successfully reset');
    //     },
    //     (error) => console.log(error)
    //   );
  }

}
