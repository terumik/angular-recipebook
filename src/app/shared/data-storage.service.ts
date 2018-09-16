import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';



@Injectable()
export class DataStorageService {
  // connect to backend
  // backend url-> https://ng-recipe-book-f441a.firebaseio.com/

  constructor(
    private http: Http,
    private recipeService: RecipeService
  ) {}

  // save to database
  storeRecipe() {
    // .put = update
    // put .json to allow firebase to handle the data, or you;ll get cors errors
    // param (where to store data, what to store)
    // then return observable
    return this.http.put(
      'https://ng-recipe-book-f441a.firebaseio.com/recipes.json',
      this.recipeService.getRecipes()
    );
  }

  // load from database
  getRecipes() {
    this.http.get('https://ng-recipe-book-f441a.firebaseio.com/recipes.json')
    .pipe(
      map(
        (res: Response) => {
          const recipes: Recipe[] = res.json();
          for (const recipe of recipes) {
            if (!recipe.ingredients) {
              console.log(recipe);
              recipe.ingredients = [];
            }
          }
          return recipes;
        }
      )
    )
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipe(recipes);
      }
    );
  }
}
