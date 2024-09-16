import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { GetClientInfoAction } from '../../../../core/store/client/client.actions';
import { IClient, IClientInfoPayload } from '../../../../core/interfaces/client.interface';
import { StoreState } from '../../../../core/store/store/store.state';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ClientState } from '../../../../core/store/client/client.state';

@Component({
  selector: 'app-modal-phone',
  templateUrl: './modal-phone.component.html',
  styleUrls: ['./modal-phone.component.scss'],
})

export class ModalPhoneComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  formPhone: FormGroup;

  client$: Observable<IClient> = new Observable();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    public matDialogRef: MatDialogRef<ModalPhoneComponent>
  ) {
    this.client$ = this.store.select(ClientState.getClient);
    this.formPhone = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      phone: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.client$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp) {
        this.matDialogRef.close();
      }
    });
  }

  searchClient() {
    const form = Object.assign({}, this.formPhone.getRawValue());
    const tenantId = this.store.selectSnapshot(StoreState.getStore)?.subdomain;
    const payload: IClientInfoPayload = {
      tenantId: tenantId,
      idClient: form.phone,
    };
    this.store.dispatch(new GetClientInfoAction(payload));
  }

  close() {
    this.matDialogRef.close(true);
  }

  ngOnDestroy() {
    this.destroy?.next(true);
    this.destroy?.unsubscribe();
  }
}
