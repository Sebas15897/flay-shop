import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../services/aside.service';
import { Location } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IStore } from '../../../core/interfaces/store-config.interface';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  title: string = ''; // Título dinámico
  showBackButton: boolean = false; // Boolean para mostrar u ocultar el botón de "volver atrás"
  cartButton: boolean = true; // Boolean para mostrar u ocultar el botón del carrito

  shop$: Observable<IStore> = new Observable();
  shop: IStore = null;

  constructor(
    private router: Router,
    private sidebarService: SidebarService,
    private location: Location,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.updateHeaderContent(); // Actualiza el contenido del encabezado al inicializar
    this.router.events.subscribe(() => {
      this.updateHeaderContent(); // Actualiza el contenido del encabezado cuando cambia la ruta
    });

    this.subscribeState();
  }

  subscribeState() {
    this.shop$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.shop = resp;
    });
  }

  updateHeaderContent() {
    const currentRoute = this.router.url;

    if (currentRoute.includes('/shop/home')) {
      this.title = 'Adidas';
      this.showBackButton = false; // No mostrar botón de "volver atrás" en Home
      this.cartButton = true;
    } else if (currentRoute.includes('/shop/catalog')) {
      this.title = 'Catalogo';
      this.showBackButton = false;
      this.cartButton = true;
    } else if (currentRoute.includes('/shop/product')) {
      this.title = 'Producto';
      this.showBackButton = true; // Mostrar botón de "volver atrás"
      this.cartButton = true;
    } else if (currentRoute.includes('/shop/shopping-cart')) {
      this.title = 'Canasta de compras';
      this.showBackButton = true;
      this.cartButton = false;
    } else if (currentRoute.includes('/shop/shipping-information')) {
      this.title = 'Compras';
      this.showBackButton = true;
      this.cartButton = false;
    } else {
      this.title = 'Adidas';
      this.showBackButton = true;
    }
  }

  redirectToHome() {
    this.router.navigate(['/shop/home']);
  }

  redirectToCart() {
    this.router.navigate(['/shop/shopping-cart']);
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  goBack() {
    this.location.back(); // Navega a la página anterior
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
