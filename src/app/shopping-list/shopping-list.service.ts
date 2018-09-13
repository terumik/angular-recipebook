import { Ingredient } from '../shared/ingredient.model';
// import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {

  // ingredientChanged was checking the changes
  // ingredientChanged = new EventEmitter<Ingredient[]>();
  ingredientChanged = new Subject<Ingredient[]>();

  // startEditing will emit data:number
  // passed from shopping-list component
  startedEditing = new Subject<number>();

  ingredients: Ingredient[] = [
    new Ingredient('Tomatos', 2),
    new Ingredient('Onion', 1)
  ];

  // return all ingredients in the array
  getIngredients() {
    // copy of the above array
    return this.ingredients.slice();
  }

  // return single ingredient by index
  getIngredient(index: number) {
    return this.ingredients[index];
  }

  // add a new ingredient submitted from the form
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

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
