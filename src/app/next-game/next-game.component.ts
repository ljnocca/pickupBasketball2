import {Component, OnInit} from '@angular/core';
import {Player} from '../players/player.model';
import {Http, Response} from '@angular/http';
import {AuthService} from '../auth/auth.service';
import * as firebase from 'firebase';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-next-game',
  templateUrl: './next-game.component.html',
  styleUrls: ['./next-game.component.scss'],
  animations: [
    trigger('status', [
      state('IN', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-100px)'
        }),
          animate(300)
      ]),
      transition('* => void', [
        animate(300, style({
          opacity: 0,
          transform: 'translateY(-100px)'
        }))
      ])
    ])
  ]
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
  public isAdmin: boolean = false;
  token;

  constructor(private http: Http,
              private authService: AuthService) { }

  ngOnInit() {
    this.token = this.authService.getToken();

    this.http.get('https://pickupbasketball-11fc7.firebaseio.com/players.json?auth=' + this.token)
      .subscribe(
        (response: Response) => {
          // set players array to response
          this.players = response.json();

          const userKey = Object.keys(window.localStorage)
            .filter(it => it.startsWith('firebase:authUser'))[0];
          const useremail = userKey ? JSON.parse(localStorage.getItem(userKey)).email : undefined;
          console.log('userEmail', useremail);

          if (useremail === undefined) {
            this.loggedInEmail = firebase.auth().currentUser.email;
          } else {
            this.loggedInEmail = useremail;
          }

          // this.loggedInEmail = firebase.auth().currentUser.email;

          // check if logged in email is an approved ADMIN
          if (this.loggedInEmail === 'laurent@laurent.com') {
            this.isAdmin = true;
          }

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

  onSlide() {
    if (this.status === 'OUT' ) {
      this.checked = true;
      this.status = 'IN';
    } else if (this.status === 'IN') {
      this.checked = false;
      this.status = 'OUT';
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

          this.playersIn = [];
          this.playersOut = [];

          for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].status === 'IN') {
              this.playersIn.push(this.players[i]);
            } else if (this.players[i].status === 'OUT') {
              this.playersOut.push(this.players[i]);
            }
          }

        },
        (error) => console.log(error)
      );
  }

  resetPlayersStatus() {
    // this will reset all status of registered players to OUT

    if (confirm('are you sure?')) {
      for (let i = 0; i < this.players.length; i++) {
        this.players[i].status = 'OUT';
      }

      this.http.put('https://pickupbasketball-11fc7.firebaseio.com/players.json?auth=' + this.token, this.players)
        .subscribe(
          (putResponse: Response) => {
            console.log('Players status has been successfully reset');
          },
          (error) => console.log(error)
        );
    }
  }
}
