import { Component, OnInit, Output, ViewChild, EventEmitter, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;  reaching input using localrefrence

  //we will do it with TD form
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editedItemIndex: number;
  editMode: boolean = false;
  editedItem: Ingredients;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  // onAddItem() {  forms before using TD
  //   const ingName = this.nameInputRef.nativeElement.value;
  //   const ingAmount = this.amountInputRef.nativeElement.value;
  //   const newIngredient = new Ingredients(
  //     ingName,
  //     ingAmount);
  //   this.shoppingListService.addIngredient(newIngredient);
  //}

  onSubmit(form: NgForm) {
    const value = form.value;
    const ingName = value.name;
    const ingAmount = value.amount;
    const newIngredient = new Ingredients(ingName, ingAmount);
    if (!this.editMode) {
      this.shoppingListService.addIngredient(newIngredient);
    }

    else {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    }
    this.editMode = false;
    this.slForm.reset();

  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

}
