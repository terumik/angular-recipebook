import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  //// @ViewChild('local ref defined in the view')
  // @ViewChild('nameInput') newIngredientName: ElementRef;
  // @ViewChild('amountInput') newIngredientAmount: ElementRef;
  @ViewChild('form') shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;


  constructor(
    private shoppinglistService: ShoppingListService,
  ) { }

  ngOnInit() {

    // startEditing holds a data passed through
    // shopping-list.ts > shopping-list.ts
    this.subscription = this.shoppinglistService.startedEditing
    .subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppinglistService.getIngredient(index);

        // to set existing values in the input fields
        this.shoppingListForm.setValue({
          nameControl: this.editedItem.name,
          amountControl: this.editedItem.amount
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(
      // this.newIngredientName.nativeElement.value,
      // this.newIngredientAmount.nativeElement.value
      form.value.nameControl, form.value.amountControl
    );

    if (this.editMode) {
      this.shoppinglistService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppinglistService.addNewIngredient(newIngredient);
    }
    // switch the mode to add mode
    this.editMode = false;
    form.reset();
  }

  onDeleteItem() {
    this.shoppinglistService.deleteIngredient(this.editedItemIndex);
    // this.shoppingListForm.resetForm();
    this.onClearForm();
    this.editMode = false;
  }

  onClearForm() {
    this.shoppingListForm.resetForm();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
