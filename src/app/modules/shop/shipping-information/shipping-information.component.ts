import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { GetAllcitiesAction } from '../../../core/store/city/city.actions';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ICity } from '../../../core/interfaces/city.interface';
import { CityState } from '../../../core/store/city/city.state';
import { IPaymentMethodToStore } from '../../../core/interfaces/store-config.interface';
import { StoreState } from '../../../core/store/store/store.state';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalPhoneComponent } from './modal-phone/modal-phone.component';
import { IClient } from '../../../core/interfaces/client.interface';
import { ClientState } from '../../../core/store/client/client.state';
import {
  CreateNewOrderAction,
  GetOrderStatusAction,
} from '../../../core/store/order/order.actions';
import { IOrderStatus } from '../../../core/interfaces/order-status';
import { OrdersState } from '../../../core/store/order/order.state';
import { IAddProductCarShop } from '../../../core/interfaces/product.interface';
import { ProductState } from '../../../core/store/product/product.state';
import { FormStatusService } from '../../../core/services/form-order-status/form-order-status.service';
import { AddNewClientAction } from '../../../core/store/client/client.actions';

@Component({
  selector: 'app-shipping-information',
  templateUrl: './shipping-information.component.html',
  styleUrls: ['./shipping-information.component.scss'],
})
export class ShippingInformationComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  cities$: Observable<ICity[]> = new Observable();
  cities: ICity[] = [];

  paymentMethods$: Observable<IPaymentMethodToStore[]> = new Observable();
  paymentMethods: IPaymentMethodToStore[] = [];

  selectProducts$: Observable<IAddProductCarShop[]> = new Observable();
  selectProducts: IAddProductCarShop[] = null;

  client$: Observable<IClient> = new Observable();
  newClient$: Observable<IClient> = new Observable();

  orderStatus$: Observable<IOrderStatus[]> = new Observable();
  orderStatus: IOrderStatus[] = [];

  orderForm: FormGroup;
  clientForm: FormGroup;

  isNewClient: boolean = false;
  storeId: string;

  selectedImageUrl: string | ArrayBuffer | null = '/assets/photoBackground.svg';

  totalShop = 0;

  matDialogFn: any = null;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private matDialog: MatDialog,
    private formStatusService: FormStatusService,
  ) {
    this.orderForm = this.createForm();
    this.clientForm = this.createClientForm();
    this.store.dispatch(new GetAllcitiesAction());
    this.store.dispatch(new GetOrderStatusAction());

    this.cities$ = this.store.select(CityState.getCities);
    this.paymentMethods$ = this.store.select(StoreState.getStorePaymentMethods);
    this.client$ = this.store.select(ClientState.getClient);
    this.newClient$ = this.store.select(ClientState.getNewClient);
    this.orderStatus$ = this.store.select(OrdersState.getorders);
    this.selectProducts$ = this.store.select(ProductState.getShopCarProducts);
    this.storeId = this.store.selectSnapshot(StoreState.getStore)?.id;
    this.clientForm.patchValue({
      storeId: this.storeId,
    });
    this.orderForm.patchValue({
      storeId: this.storeId,
    });
  }

  ngOnInit() {
    this.subscribeState();
    this.subscribeForm();
  }

  subscribeForm() {
    this.orderForm.statusChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(() => this.updateFormStatus());
    this.clientForm.statusChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(() => this.updateFormStatus());

    this.clientForm
      .get('address')
      .valueChanges.pipe(takeUntil(this.destroy))
      .subscribe((resp) => {
        if (resp) {
          this.orderForm.get('address').setValue(resp);
        } else {
          this.orderForm.get('address').setValue(null);
        }
      });
  }

  subscribeState() {
    this.cities$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.cities = resp;
    });

    this.paymentMethods$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.paymentMethods = resp;
    });

    this.client$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp && resp.id) {
        this.orderForm.patchValue({
          clientId: resp.id,
        });
        this.clientForm.patchValue({
          name: resp.name,
          lastName: resp.lastName,
          neighborhood: resp.neighborhood,
          email: resp.email,
          phone: resp.phone,
          identification: resp.identification,
          address: resp.address1,
          cityId: resp.city.id,
          storeId: resp.storeId,
        });
        this.matDialogFn?.close();
      }
    });

    this.newClient$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp && resp?.id) {
        this.orderForm.patchValue({
          clientId: resp.id,
        });
        this.clientForm.patchValue({
          name: resp?.name,
          lastName: resp?.lastName,
          neighborhood: resp?.neighborhood,
          email: resp?.email,
          phone: resp?.phone,
          identification: resp?.identification,
          cityId: resp.city?.id,
          storeId: resp?.storeId,
        });

        const orderForm = Object.assign({}, this.orderForm.getRawValue());

        this.store.dispatch(new CreateNewOrderAction(orderForm));
      }
    });

    this.orderStatus$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp && resp.length) {
        this.orderStatus = resp;
      } else {
        this.orderStatus = [];
      }
    });

    this.selectProducts$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.selectProducts = resp;
      this.selectProducts = resp.map((product) => ({
        ...product,
        isOpen: false,
      }));
      this.calculateTotalSum();

      this.productsFormArray.clear();

      this.selectProducts.forEach((product) => {
        this.productsFormArray.push(this.createProductFormGroup(product));
      });
    });

    this.formStatusService.finish$
      .pipe(takeUntil(this.destroy))
      .subscribe((resp) => {
        if (resp) {
          const formClient = Object.assign({}, this.clientForm.getRawValue());
          formClient.cityId = Number(formClient.cityId);
          if (formClient && formClient.clientId) {
            const orderForm = Object.assign({}, this.orderForm.getRawValue());
            this.store.dispatch(new CreateNewOrderAction(orderForm));
          } else {
            this.store.dispatch(new AddNewClientAction(formClient));
          }
        }
      });
  }

  get productsFormArray(): FormArray {
    return this.orderForm.get('products') as FormArray;
  }

  createProductFormGroup(product: IAddProductCarShop): FormGroup {
    return this.fb.group({
      productId: [product.productId],
      name: [product.name],
      quantity: [product.quantity],
      price: [product.price],
      categoryId: [product.categoryId],
      variants: [product.variants],
    });
  }

  calculateTotalSum() {
    this.totalShop = this.selectProducts.reduce(
      (sum, product) => sum + product.total,
      0
    );

    this.orderForm.patchValue({
      total: this.totalShop,
    });
  }

  createClientForm(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      neighborhood: [null],
      email: [null],
      phone: [null, Validators.required],
      identification: [null],
      address: [null],
      cityId: [null],
      storeId: [null],
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      clientId: [null],
      address: [null, Validators.maxLength(255)],
      products: this.fb.array([]),
      deliveryCost: [10000, [Validators.required, Validators.min(0)]],
      subTotal: [0],
      total: [0, [Validators.required, Validators.min(0)]],
      discount: [0, Validators.min(0)],
      notes: [null, Validators.maxLength(255)],
      dateScheduled: [null],
      scheduleId: [0],
      orderStateId: [0],
      paymentStateId: [null, [Validators.required]],
      paymentMethodId: [null, [Validators.required]],
      voucherUrl: [null],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImageUrl = e.target?.result;
      };
      reader.readAsDataURL(file);
      this.orderForm.patchValue({
        voucherUrl: file,
      });
    }
  }

  deleteImage() {
    this.selectedImageUrl = '/assets/photoBackground.svg';
    this.fileInput.nativeElement.value = '';
  }

  editImage() {
    this.fileInput.nativeElement.click();
  }

  client(isNewClient: boolean) {
    this.isNewClient = isNewClient;
    if (isNewClient) {
      this.matDialogFn = this.matDialog.open(ModalPhoneComponent, {
        width: '325px',
        height: 'auto',
      });
    }
  }

  updateFormStatus() {
    const form = Object.assign({}, this.orderForm.getRawValue());
    form.client = this.clientForm.getRawValue();
    const isValid = this.orderForm.valid && this.clientForm.valid;
    this.formStatusService.updateFormStatus(isValid);
    this.formStatusService.updateOrdernValue(form);
  }

  ngOnDestroy() {
    this.destroy?.next(true);
    this.destroy?.unsubscribe();
  }
}
