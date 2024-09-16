import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../services/aside.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IStore } from '../../../core/interfaces/store-config.interface';
import { Store } from '@ngxs/store';
import { StoreState } from '../../../core/store/store/store.state';
import { IAddProductCarShop } from '../../../core/interfaces/product.interface';
import { ProductState } from '../../../core/store/product/product.state';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  isVisible = false;

  shop$: Observable<IStore> = new Observable();
  shop: IStore = null;

  selectProducts$: Observable<IAddProductCarShop[]> = new Observable();
  selectProducts: IAddProductCarShop[] = null;

  constructor(
    private router: Router,
    private sidebarService: SidebarService,
    private store: Store,
  ) {
    this.selectProducts$ = this.store.select(ProductState.getShopCarProducts);
    this.shop$ = this.store.select(StoreState.getStore);
  }

  ngOnInit() {
    this.sidebarService.sidebarVisible$.subscribe(isVisible => {
      this.isVisible = isVisible;
      if (isVisible == true) {
        document.body.style.overflow = 'hidden';
      }else{
        document.body.style.overflow = '';
      }
    });
    this.subscribeState();
  }

  subscribeState() {
    this.shop$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.shop = resp;
    });

    this.selectProducts$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.selectProducts = resp;
    });
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  redirectToCart(){
    this.router.navigate(['/shop/shopping-cart']);

    if (this.isVisible == true) {
      this.toggleSidebar();
    }
  }

  redirectToHome(){
    this.router.navigate(['/shop/home']);

    if (this.isVisible == true) {
      this.toggleSidebar();
    }
  }

  redirectToCatalog(){
    this.router.navigate(['/shop/catalog']);

    if (this.isVisible == true) {
      this.toggleSidebar();
    }
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
