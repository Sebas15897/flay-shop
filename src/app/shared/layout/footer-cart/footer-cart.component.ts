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
  normal: boolean = true;
  shipping: boolean = false;

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
      this.normal = false;
      this.cartButtons = true;
      this.shipping = false;
    }else if(currentRoute.includes('/shop/shipping-information')) {
      this.normal = false;
      this.cartButtons = false;
      this.shipping = true;
    }else{
      this.normal = true;
      this.cartButtons = false;
      this.shipping = false;
    }
  }

  redirecToShipping(){
    this.router.navigate(['/shop/shipping-information']);
  }

  redirecToCatalog(){
    this.router.navigate(['/shop/catalog']);
  }
}
