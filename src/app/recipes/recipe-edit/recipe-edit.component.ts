import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          // check if the recipe is existing one or not
          // if there is an id (params != null ), switch editMode to true
          this.editMode = params['id'] != null;

          // call initForm() when the params changed
          this.initForm();
        }
      );
  }

  // need to explicitly declare the method
  // let ingredientControl of recipeForm.get('ingredients').controls woun't work
  getIngredientsFormArrayControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    // option 1: create an object and pass the value
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['nameControl'],
    //   this.recipeForm.value['descriptionControl'],
    //   this.recipeForm.value['imagePathControl'],
    //   this.recipeForm.value['ingredients'],
    // );

    // option 2: just pass the FormGroup
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  // Create new input fields for adding a new ingredient
  onAddIngredient() {
    // (<FormArray> ***) to cast *** to FormArray
    (<FormArray> this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'ingredientName': new FormControl(null, Validators.required),
        'ingredientAmount': new FormControl(null,
          [Validators.required, Validators.pattern(/^[1-9]+[1-9]*$/)]
        )
      })
    );
  }

  onCancel() {
    // go one level back
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  // remove the input field for adding a new ingredient
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients'))
    .removeAt(index);
  }

  // Reactive Form
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    // for the ingredients
    const recipeIngredients = new FormArray([]); // FormArray(defaultVal, )

    // check if it's in the edit mode
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      // if there are ingredients stored in the recipe
      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          // Push form(s) to FromArray
          recipeIngredients.push(
            // FormGroup is to group up two controls (name and amount)
            new FormGroup({
              // the names have to be matched with the ingredient model properties
              // otherwise, view (recipe-item) do not read the properties and show nothing
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(
                ingredient.amount,
                [Validators.required, Validators.pattern(/^[1-9]+[1-9]*$/)]
              )
            })
          );
        }
      }
    }

    // when you use the reactive form approach,
    // the names have to be matched with the recipe model (and ingredient model) properties
    // otherwise, view (recipe-item) do not read the properties and show nothing
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients // recipeIngredient is a FormArray
    });
  }



}
