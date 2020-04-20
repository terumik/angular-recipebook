import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'; // import all as alias from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipes';

  ngOnInit() {
    // to use firebase sdk, we need to configure it when the app starts
    firebase.initializeApp({
      apiKey: 'AIzaSyCwloPfXm86VN9wtlwzMYCObt_a1sAgQGg',
      authDomain: 'ng-recipe-book-f441a.firebaseapp.com',
    });
  }

  // event fired when user click the navigation link
  onNavigateLink(selectedFeature: string) {
    this.loadedFeature = selectedFeature;
  }
}
