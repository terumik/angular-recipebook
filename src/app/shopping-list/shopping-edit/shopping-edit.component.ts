import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  // @ViewChild('local ref defined in the view')
  @ViewChild('nameInput') newIngredientName: ElementRef;
  @ViewChild('amountInput') newIngredientAmount: ElementRef;


  constructor(
    private shoppinglistService: ShoppingListService,
  ) { }

  ngOnInit() {
  }

  onAddItem() {
    const newIngredient = new Ingredient(
      this.newIngredientName.nativeElement.value,
      this.newIngredientAmount.nativeElement.value
    );
    this.shoppinglistService.addNewIngredient(newIngredient);
  }
}
