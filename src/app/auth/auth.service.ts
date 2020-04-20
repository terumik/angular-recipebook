import * as firebase from 'firebase'; // import all as alias from 'firebase'
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor(
    private router: Router,
  ) {}

  token: string;

  // register a new user to the firebase
  signupUser(email: string, pw: string) {
    firebase.auth().createUserWithEmailAndPassword(email, pw)
    .catch(
      error => console.log(error)
    );
  }

  // login
  signinUser (email: string, pw: string) {
    firebase.auth().signInWithEmailAndPassword(email, pw)
    .then(
      // if success, firebase will create a token and store it in Application > IndexedDb (not local storage)
      (res) => {
        console.log(res);
        this.router.navigate(['/']);
        firebase.auth().currentUser.getIdToken()
        .then(
          (token: string) => this.token = token
        );
      }
    )
    .catch (
      err => console.log(err)
    );
  }

  logoutUser() {
    firebase.auth().signOut();
    this.token = null;
  }

  // get current user's token from backend
  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  // check if the user is authenticated or not
  isAuthenticated() {
    return this.token != null;
  }

}
