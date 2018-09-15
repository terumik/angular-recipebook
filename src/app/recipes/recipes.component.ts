import { Component, OnInit } from '@angular/core';
// import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // child components will have the shared instance of RecipeService
  // HOWEVER, this won't work if we navigate to shoppinglist component
  // because the recipe component is destroyed when we navigate to other components
  // and RecipeService as well
  // to prevent this, we need to provide the service in the root (app.module)
  // providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

}
