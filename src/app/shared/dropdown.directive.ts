import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector : '[appDropdown]',
})

export class DropdownDirective {
     @HostBinding('class.open') isOpen: boolean = false; 
   
    // @HostListener('click') toggleOpen(){
    //     this.isOpen = !this.isOpen; 
    // }                                     //toggle when just click on button 

    @HostListener('document:click',['$event']) toggleOpen(){
        this.isOpen = this.elRef.nativeElement.contains(event.target)? !this.isOpen : false;
    } //toggle when click anywhere 

    constructor(private elRef: ElementRef){}
}