import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../services/aside.service';
import { Location } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IStore } from '../../../core/interfaces/store-config.interface';
import { Store } from '@ngxs/store';
import { IAddProductCarShop } from '../../../core/interfaces/product.interface';
import { ProductState } from '../../../core/store/product/product.state';
import { StoreState } from '../../../core/store/store/store.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  title: string = '';
  showBackButton: boolean = false;
  cartButton: boolean = true;

  shop$: Observable<IStore> = new Observable();
  shop: IStore = null;

  selectProducts$: Observable<IAddProductCarShop[]> = new Observable();
  selectProducts: IAddProductCarShop[] = null;

  constructor(
    private router: Router,
    private sidebarService: SidebarService,
    private location: Location,
    private store: Store
  ) {
    this.selectProducts$ = this.store.select(ProductState.getShopCarProducts);
    this.shop$ = this.store.select(StoreState.getStore);
  }

  ngOnInit() {
    this.updateHeaderContent();
    this.router.events.subscribe(() => {
      this.updateHeaderContent();
    });

    this.subscribeState();
  }

  subscribeState() {
    this.shop$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.shop = resp;
      this.updateHeaderContent();
    });

    this.selectProducts$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.selectProducts = resp;
    });
  }

  updateHeaderContent() {
    const currentRoute = this.router.url;

    if (currentRoute.includes('/shop/home')) {
      this.title = this.shop?.name;
      this.showBackButton = false;
      this.cartButton = true;
    } else if (currentRoute.includes('/shop/catalog')) {
      this.title = 'Catalogo';
      this.showBackButton = false;
      this.cartButton = true;
    } else if (currentRoute.includes('/shop/product')) {
      this.title = 'Producto';
      this.showBackButton = true;
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
      this.title = this.shop?.name;
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
    this.location.back();
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
