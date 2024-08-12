import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-footer-cart',
  templateUrl: './footer-cart.component.html',
  styleUrls: ['./footer-cart.component.css']
})
export class FooterCartComponent {
  cartButtons: boolean = true;

  constructor(
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.updateFooterContent(); // Actualiza el contenido del encabezado al inicializar
    this.router.events.subscribe(() => {
      this.updateFooterContent(); // Actualiza el contenido del encabezado cuando cambia la ruta
    });
  }

  updateFooterContent(){
    const currentRoute = this.router.url;

    if (currentRoute.includes('/shop/shopping-cart')) {
      this.cartButtons = true;
    }else if(currentRoute.includes('/shop/shipping-cart')) {
      this.cartButtons = true;
    }else{
      this.cartButtons = false;
    }
  }
}
