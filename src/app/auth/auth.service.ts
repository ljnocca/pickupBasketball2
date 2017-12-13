import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Player} from '../players/player.model';
import {Http, Response} from '@angular/http';

@Injectable()
export class AuthService {
  token: string;
  public players: Array<Player> = [];

  constructor(private router: Router,
              private http: Http) { }

  signupUser (player: Player) {
    // create the user in firebase & get the token
    firebase.auth().createUserWithEmailAndPassword(player.email, player.password)
      .then(
        success => {
          console.log('Successfully signed up!');
          firebase.auth().signInWithEmailAndPassword(player.email, player.password)
            .then(
              response => {
                firebase.auth().currentUser.getIdToken()
                  .then(
                    (tokenRetrieved: string) => {
                      this.token = tokenRetrieved;
                      console.log('Successfully signed in!');
                      // get all the players
                      this.http.get('https://pickupbasketball-11fc7.firebaseio.com/players.json?auth=' + this.token)
                        .subscribe(
                          (responseFromGet: Response) => {
                            console.log('successfully retrieved players array');
                            if (responseFromGet.json() !== null) {
                              // if players already exist, set the player array to what is already stored in Firebase
                              this.players = responseFromGet.json();
                              // add the signedup player
                              this.players.push(player);
                            } else {
                              // if players don't exist on backend (AKA first user signed up) then add to empty array
                              this.players.push(player);
                            }
                            // save players array to Firebase
                            this.http.put('https://pickupbasketball-11fc7.firebaseio.com/players.json?auth=' + this.token, this.players)
                              .subscribe(
                                (putResponse: Response) => {
                                  console.log('successfully saved new players array');
                                  this.router.navigate(['/nextgame']);
                                },
                                (error) => console.log(error)
                              );
                          }
                        );
                    }
                  );
              }
            );
        }
      )
      .catch(
        error => console.log('There was an error signing up: ', error)
      );
  }

  signinUser (email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/nextgame']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                this.token = token;
                console.log('Successfully signed in!');
              }
            );
        }
      )
      .catch(
        error => alert('Wrong email or password. Please try again.')
      );
  }

  logoutUser() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/']);
  }

  getToken() {

    const userKey = Object.keys(window.localStorage)
      .filter(it => it.startsWith('firebase:authUser'))[0];
    const user = userKey ? JSON.parse(localStorage.getItem(userKey)).stsTokenManager.accessToken : undefined;
    console.log('user', user);

    if (user === undefined) {
      firebase.auth().currentUser.getIdToken()
        .then(
          (token: string) => {
            this.token = token;
            console.log('token is', this.token);
          }
        );
      return this.token;
    } else {
      this.token = user;
      return this.token;
    }
  }

  isAuthenticated() {
    return this.token != null;
  }
}
