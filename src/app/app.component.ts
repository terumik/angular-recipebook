import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature = 'recipes';

  // event fired when user click the navigation link
  onNavigateLink(selectedFeature: string) {
    this.loadedFeature = selectedFeature;
  }
}
