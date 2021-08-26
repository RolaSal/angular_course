import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredients } from "../shared/ingredients.model";

export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredients[]>();     // ingredientsChanged = new EventEmitter<Ingredients[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredients[] = [
        new Ingredients(' Apple ', 5),
        new Ingredients(' Tomatoes ', 10),
      ];
    getIngredients():Ingredients[]{
        return this.ingredients.slice();
    } 
    getIngredient(index: number){
        return this.ingredients[index];
    }
    
    addIngredient(ingredient: Ingredients){
        this.ingredients.push(ingredient); 
         this.ingredientsChanged.next(this.ingredients.slice());  // this.ingredientsChanged.emit(this.ingredients.slice());  
      }
    
    addIngredients(ingredients: Ingredients[]){
        //for(let ingredient of ingredients)
           // this.addIngredient(ingredient)

        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number , newIngredient: Ingredients){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}