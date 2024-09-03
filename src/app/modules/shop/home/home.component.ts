import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
  IDeliveryMethod,
  IStore,
} from '../../../core/interfaces/store-config.interface';
import { Store } from '@ngxs/store';
import { StoreState } from '../../../core/store/store/store.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  shop$: Observable<IStore> = new Observable();
  shop: IStore = null;

  deliveryMethods$ = this.store.select(StoreState.getdeliveryMethods);
  deliveryMethods: IDeliveryMethod[] = [];

  constructor(private router: Router, private store: Store) {
    this.deliveryMethods$ = this.store.select(StoreState.getdeliveryMethods);
    this.shop$ = this.store.select(StoreState.getStore);
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.shop$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.shop = resp;
    });

    this.deliveryMethods$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.deliveryMethods = resp;
    });
  }

  redirectToCatalog() {
    this.router.navigate(['/shop/catalog']);
  }

  getIconTypePayment(type: string): string {
    let url = '';
    switch (type) {
      case 'Efectivo':
        url = '/assets/efectivo.png';
    }
    return url;
  }

  getIconDeliveryMethods(type: string): string {
    let url = '';
    switch (type) {
      case 'Entrega en tienda ':
        url = '/assets/tienda.png';
        break;
      case 'Domicilio':
        url = '/assets/motoDomicilio.png';
        break;
    }
    return url;
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
