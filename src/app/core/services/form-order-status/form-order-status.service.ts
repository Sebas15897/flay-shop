import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IOrderPayload } from '../../interfaces/order-status';

@Injectable({
  providedIn: 'root',
})

export class FormStatusService {
  private formStatusSource = new BehaviorSubject<boolean>(false);
  formStatus$ = this.formStatusSource.asObservable();
  private order = new BehaviorSubject<IOrderPayload>(null);
  order$ = this.order.asObservable();

  updateFormStatus(isValid: boolean) {
    this.formStatusSource.next(isValid);
  }

  updateOrdernValue(order: IOrderPayload) {
    this.order.next(order);
  }
}
