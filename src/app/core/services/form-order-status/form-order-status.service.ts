import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IOrderPayloadWhatsapp } from '../../interfaces/order-status';

@Injectable({
  providedIn: 'root',
})

export class FormStatusService {
  private formStatusSource = new BehaviorSubject<boolean>(false);
  formStatus$ = this.formStatusSource.asObservable();
  private order = new BehaviorSubject<IOrderPayloadWhatsapp>(null);
  order$ = this.order.asObservable();
  private finish = new BehaviorSubject<boolean>(null);
  finish$ = this.finish.asObservable();

  updateFormStatus(isValid: boolean) {
    this.formStatusSource.next(isValid);
  }

  updateOrdernValue(order: IOrderPayloadWhatsapp) {
    this.order.next(order);
  }

  finishSale(finish: boolean) {
    this.finish.next(finish);
  }
}
