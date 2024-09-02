import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetStoreInfoAction } from './core/store/store/store.actions';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(private store: Store) {
    this.store.dispatch(new GetStoreInfoAction(environment.tenant_test_url));
  }
}
