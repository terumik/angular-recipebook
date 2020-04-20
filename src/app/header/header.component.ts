import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Response } from '@angular/http';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(
    private dataStorageService: DataStorageService,
    public authService: AuthService,
  ) {}

  // store the data in the backend (firebase)
  onSaveData() {
    this.dataStorageService.storeRecipes()
    .subscribe(
      (res: Response) => {
        console.log(res);
      }
    );
    this.dataStorageService.storeIngredients()
    .subscribe(
      (res: Response) => {
        console.log(res);
      }
    );
  }

  // load the data from the backend
  onLoadData() {
    this.dataStorageService.getRecipes();
    this.dataStorageService.getIngredients();
  }

  onLogoutUser() {
    this.authService.logoutUser();
  }
}
