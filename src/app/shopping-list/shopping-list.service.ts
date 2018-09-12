import { Ingredient } from '../shared/ingredient.model';
// import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {

  // ingredientChanged was checking the changes
  // ingredientChanged = new EventEmitter<Ingredient[]>();
  ingredientChanged = new Subject<Ingredient[]>();

  ingredients: Ingredient[] = [
    new Ingredient('Tomatos', 2),
    new Ingredient('Onion', 1)
  ];

  getIngredients() {
    // copy of the above array
    return this.ingredients.slice();
  }

  // add new ingredient submitted from the form
  addNewIngredient(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);

    // instead of .emit, use next (rxjx)
    // this.ingredientChanged.emit(this.ingredients.slice());
    this.ingredientChanged.next(this.ingredients.slice());

  }

  // add new ingredients through the recipe detail
  addIngredients(newIngredients: Ingredient[]) {
    this.ingredients.push(...newIngredients);

    // instead of .emit, use next (rxjx)
    // this.ingredientChanged.emit(this.ingredients.slice());
    this.ingredientChanged.next(this.ingredients.slice());
  }

}
