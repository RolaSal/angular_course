import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  array = [1, 2, 3, 4, 5]
  id: number;
  editMode: boolean = false;
  //will do it with Reactive Forms
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null; //if there is an id which mean there is an edite
        this.initForm();
      }
    );

  }

  private initForm() {
    let recipeNme = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredient = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeitem(this.id);
      recipeNme = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description
      if (recipe['ingredient']) { //if this recipe has an ingredient array
        for (let ingredient of recipe.ingredient) {
          recipeIngredient.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required,
              Validators.pattern(/[1-9]+[0-9]*$/)])
            })
          );
        }
      }
      this.array = recipeIngredient.value
      console.log(recipeIngredient);
    }



    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeNme, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredient, //array
    });
    console.log(this.recipeForm.controls.ingredients.value.value);
    console.log(this.recipeForm)

  }

  // get controls() { // a getter!
  //   return (<FormArray>this.recipeForm.get('ingredients')).controls;
  // }

  get ingredients(): FormArray {
    return this.recipeForm.controls.ingredients as FormArray;
    // return this.recipeForm.get('ingredients') as FormArray;
  }
  onSubmit() {
    const newRecipe = new Recipe(this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']);

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    }
    else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route}); // ['../'] mean go up one level
  }

  onAddIngredient() {
    // <FormArray> to change it from AbstractContro toformArray
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(),
        'amount': new FormControl()
      })
    );
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}

