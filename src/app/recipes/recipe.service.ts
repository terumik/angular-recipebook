import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

// make this class injectable to the other service(s)
@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('Cheese Cake', 'Cake is yummy!',
    'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    [new Ingredient('Cream Cheese', 1), new Ingredient('Strawberry', 5)]),
    new Recipe('Avocado & Egg Sandwich', 'Sandwich is yummy!',
    'https://images.pexels.com/photos/793785/pexels-photo-793785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    [new Ingredient('Egg', 2), new Ingredient('Avocado', 1)]),
  ];

  constructor(
    private shoppingListService: ShoppingListService
  ) {}

  getRecipes() {
    // return copy of the above array
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
