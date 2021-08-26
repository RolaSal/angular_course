import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
   // recipeSelected = new Subject<Recipe>(); //recipeSelected = new EventEmitter<Recipe>(); we dont need it because we use routing
   recipeChanged = new Subject<Recipe[]>();
    recipes: Recipe[] =
        [
            new Recipe(
                ' Grilled Sweet Potatoes ',
                ' This is a test recipe ',
                'https://www.simplyrecipes.com/thmb/OCi18J2V8OeKDFV3FxoeKvgq74E=/1423x1067/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2012__07__grilled-sweet-potatoes-horiz-a-1600-7c8292daa98e4020b447f0dc97a45cb7.jpg',
                [ new Ingredients('potatoes', 3),
                  new Ingredients('tomatoes', 1)
                ]
            ),
            new Recipe(
                ' Spaghetti ',
                ' This is a test recipe ',
                'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574',
                [ new Ingredients('spaghetti', 1),
                  new Ingredients('cream', 1)
                ]
            ),
        ];

    constructor(private shoppingListService: ShoppingListService){}

    getRecipe(): Recipe[] {
        return this.recipes.slice(); //.slice() to return a cope of the array
    }

    getRecipeitem(index : number) {
        return this.recipes[index];//.slice() to return a cope of the array
    }

    addIngredienttoShoppingList(ingredient: Ingredients[]){
        this.shoppingListService.addIngredients(ingredient);
    }

    addRecipe( recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());

    }

    deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
    }
}