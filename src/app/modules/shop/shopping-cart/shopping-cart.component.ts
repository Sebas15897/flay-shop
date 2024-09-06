import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})

export class ShoppingCartComponent {
  isOpen: boolean = false;

  toggleDescription(): void {
    this.isOpen = !this.isOpen;
  }
}
