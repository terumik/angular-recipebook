import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // child components will have the shared RecipeService
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

}
