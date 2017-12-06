import {Component, OnInit} from '@angular/core';
import {Player} from '../players/player.model';
import {Http, Response} from '@angular/http';
import {AuthService} from '../auth/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-next-game',
  templateUrl: './next-game.component.html',
  styleUrls: ['./next-game.component.scss']
})
export class NextGameComponent implements OnInit {
  public nextGame;
  public loggedInEmail;
  public loggedInUserIndex;
  public status = 'OUT';
  public checked;
  public players: Array<Player> = [];
  public playersIn: Array<Player> = [];
  public playersOut: Array<Player> = [];
  token: string;

  constructor(private http: Http,
              private authService: AuthService) { }

  ngOnInit() {
    this.token = this.authService.getToken();
    this.http.get('https://pickupbasketball-11fc7.firebaseio.com/players.json?auth=' + this.token)
      .subscribe(
        (response: Response) => {
          // set players array to response
          this.players = response.json();
          this.loggedInEmail = firebase.auth().currentUser.email;

          // find index of logged in user to set status
          for (let i = 0; i < this.players.length; i++) {
            if (this.loggedInEmail === this.players[i].email) {
              this.loggedInUserIndex = i;
              this.status = this.players[this.loggedInUserIndex].status;
            }
          }

          // set toggle
          if (this.status === 'IN') {
            this.checked = true;
          } else if (this.status === 'OUT') {
            this.checked = false;
          }
          // create the IN and OUT array for display
          for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].status === 'IN') {
              this.playersIn.push(this.players[i]);
            } else if (this.players[i].status === 'OUT') {
              this.playersOut.push(this.players[i]);
            }
          }
        }
      );
  }

  refreshDays() {

  }

  onSlide() {
    if (this.status === 'OUT' ) {
      this.checked = false;
      this.status = 'IN';
    } else if (this.status === 'IN') {
      this.checked = true;
      this.status = 'OUT'
    }

    for (let i = 0; i < this.players.length; i++) {
      if (this.loggedInEmail === this.players[i].email) {
        this.players[this.loggedInUserIndex].status = this.status;
      }
    }

    this.http.put('https://pickupbasketball-11fc7.firebaseio.com/players.json?auth=' + this.token, this.players)
      .subscribe(
        (putResponse: Response) => {
          console.log('successfully saved new players array');
        },
        (error) => console.log(error)
      );
  }

}
