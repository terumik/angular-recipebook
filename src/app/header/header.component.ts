import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Response } from '@angular/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(
    private dataStorageService: DataStorageService,
  ) {}

  // store the data in the backend (firebase)
  onSaveData() {
    this.dataStorageService.storeRecipe()
    .subscribe(
      (res: Response) => {
        console.log(res);
      }
    );
  }

  // load the data from the backend
  onLoadData() {
    this.dataStorageService.getRecipes();
  }
}
