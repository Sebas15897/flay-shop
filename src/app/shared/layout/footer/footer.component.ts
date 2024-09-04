import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IStore } from '../../../core/interfaces/store-config.interface';
import { Store } from '@ngxs/store';
import { StoreState } from '../../../core/store/store/store.state';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})

export class FooterComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  shop$: Observable<IStore> = new Observable();
  shop: IStore = null;

  constructor(private store: Store) {
    this.shop$ = this.store.select(StoreState.getStore);
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.shop$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.shop = resp;
    });
  }


  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
