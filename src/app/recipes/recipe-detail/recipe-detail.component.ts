import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe : Recipe;
  recipe : Recipe;
  id: number;
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router){}

  ngOnInit(): void {
    this.recipeService.recipeChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipe = recipes[this.id];
        }
      );
    this.route.params
      .subscribe(
          (params: Params)=>{
            this.id = +params['id'];//+ to change str to num
            this.recipe = this.recipeService.getRecipeitem(this.id);
          }
      );

  }

  onAddToShoppingList(){
    this.recipeService.addIngredienttoShoppingList(this.recipe.ingredient);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route}); //because we already in recipes\id
    //this.router.navigate(['../', this.id,'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

 test(){
   console.log(this.recipe.ingredient);
 }

}
