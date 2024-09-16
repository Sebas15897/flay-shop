import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IAddProductCarShop } from '../../../core/interfaces/product.interface';
import { Store } from '@ngxs/store';
import { ProductState } from '../../../core/store/product/product.state';
import {
  ClearCarProductsAction,
  DecrementProductQuantityAction,
  IncrementProductQuantityAction,
  RemoveProductFromCarAction,
} from '../../../core/store/product/product.actions';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})

export class ShoppingCartComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  selectProducts$: Observable<IAddProductCarShop[]> = new Observable();
  selectProducts: IAddProductCarShop[] = null;

  totalShop = 0;

  constructor(private store: Store) {
    this.selectProducts$ = this.store.select(ProductState.getShopCarProducts);
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.selectProducts$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.selectProducts = resp;
      this.selectProducts = resp.map((product) => ({
        ...product,
        isOpen: false,
      }));
      this.calculateTotalSum();
    });
  }

  calculateTotalSum() {
    this.totalShop = this.selectProducts.reduce(
      (sum, product) => sum + product.total,
      0
    );
  }

  toggleDescription(productId: string): void {
    this.selectProducts = this.selectProducts.map((product) =>
      product.id === productId
        ? { ...product, isOpen: !product.isOpen }
        : product
    );
  }

  deleteProduct(productId: string | null) {
    const action = productId
      ? new RemoveProductFromCarAction(productId)
      : new ClearCarProductsAction();
    this.store.dispatch(action);
  }

  incrementQuantity(productId: string) {
    this.store.dispatch(new IncrementProductQuantityAction(productId));
  }

  decrementQuantity(productId: string) {
    this.store.dispatch(new DecrementProductQuantityAction(productId));
  }

  ngOnDestroy() {
    this.destroy?.next(true);
    this.destroy?.unsubscribe();
  }
}
