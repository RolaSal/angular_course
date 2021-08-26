import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers: [RecipeService] move it to appmodule to make the hole project share the same instance
})
export class RecipesComponent implements OnInit {
  // selectedRecipe: Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    // this.recipeService.recipeSelected.subscribe(   we now using routing
    //   (recipe: Recipe) => {
    //     this.selectedRecipe = recipe;
    //  }
  //  );
  }

}
