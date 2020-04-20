import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';
import { AuthService } from '../auth/auth.service';



@Injectable()
export class DataStorageService {
  // connect to backend
  // backend url-> https://ng-recipe-book-f441a.firebaseio.com/

  constructor(
    private http: Http,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private authService: AuthService,
  ) {}

  // save to database
  storeRecipes() {
    const token = this.authService.getToken();

    // .put = update
    // put .json to allow firebase to handle the data, or you;ll get cors errors
    // param (where to store data, what to store)
    // then return observable
    // query param "auth" will be recognized by firebase
    return this.http.put(
      'https://ng-recipe-book-f441a.firebaseio.com/recipes.json?auth=' + token,
      this.recipeService.getRecipes()
    );
  }

  storeIngredients() {
    const token = this.authService.getToken();

    return this.http.put(
      'https://ng-recipe-book-f441a.firebaseio.com/ingredients.json?auth=' + token,
      this.shoppingListService.getIngredients()
    );
  }

  // load from database
  getRecipes() {
    const token = this.authService.getToken();

    // query param "auth" will be recognized by firebase
    this.http.get('https://ng-recipe-book-f441a.firebaseio.com/recipes.json?auth=' + token)
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

  getIngredients() {
    const token = this.authService.getToken();

    this.http.get('https://ng-recipe-book-f441a.firebaseio.com/ingredients.json?auth=' + token)
    .pipe(
      map(
        (res: Response) => {
          const ingredients: Ingredient[] = res.json();
          console.log(ingredients);
          return ingredients;
        }
      )
    )
    .subscribe(
      (ingredients: Ingredient[]) => {
        this.shoppingListService.setIngredients(ingredients);
      }
    );

  }
}
