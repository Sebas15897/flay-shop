import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
  IAddProductCarShop,
  IProduct,
} from '../../../core/interfaces/product.interface';
import { ProductState } from '../../../core/store/product/product.state';
import { Store } from '@ngxs/store';
import { AddProductToCarAction } from '../../../core/store/product/product.actions';
import { MatDialog } from '@angular/material/dialog';
import { FlayAlertComponent } from '../../../core/components/flay-alert/flay-alert.component';
import { FormStatusService } from '../../../core/services/form-order-status/form-order-status.service';
import {
  IOrderPayloadWhatsapp,
  IOrderResponse,
} from '../../../core/interfaces/order-status';
import { StoreState } from '../../../core/store/store/store.state';
import { OrdersState } from '../../../core/store/order/order.state';

@Component({
  selector: 'app-footer-cart',
  templateUrl: './footer-cart.component.html',
  styleUrls: ['./footer-cart.component.scss'],
})

export class FooterCartComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  product$: Observable<IProduct> = new Observable();
  product: IProduct = null;
  irOderCreated$: Observable<IOrderResponse> = new Observable();
  selectProducts$: Observable<IAddProductCarShop[]> = new Observable();
  selectProducts: IAddProductCarShop[] = null;
  cartButtons: boolean = true;
  normal: boolean = true;
  shipping: boolean = false;
  productForm: FormGroup;
  totalShop: number = 0;

  isFormValid: boolean = false;
  order: IOrderPayloadWhatsapp = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store,
    private matDialog: MatDialog,
    private formStatusService: FormStatusService
  ) {
    this.productForm = this.createForm();
    this.product$ = this.store.select(ProductState.getSelectedProduct);
    this.selectProducts$ = this.store.select(ProductState.getShopCarProducts);
    this.irOderCreated$ = this.store.select(OrdersState.getCreateOrderResponse);
  }

  ngOnInit() {
    this.updateFooterContent();
    this.router.events.subscribe(() => {
      this.updateFooterContent();
    });

    this.subscribeState();
  }

  subscribeState() {
    this.product$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp) {
        this.productForm.patchValue({
          productId: resp.id,
          variantId: null,
          referenceId: resp.referenceId,
          name: resp.name,
          enabled: resp.enabled,
          withVariant: resp.withVariant,
          sku: resp.sku,
          discount: resp.discount,
          description: resp.description,
          stock: resp.stock,
          price: resp.price,
          numberEmergency: resp.numberEmergency,
          variants: resp.variants,
          unit: resp.unit,
          state: resp.state,
          category: resp.category,
          files: resp.files,
          categoryId: resp.categoryId,
          quantity: 1,
          total: resp.price,
        });
        this.product = resp;
      }
    });

    this.selectProducts$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.selectProducts = resp;
      this.calculateTotalSum();
    });

    this.formStatusService.formStatus$
      .pipe(takeUntil(this.destroy))
      .subscribe((isValid) => {
        this.isFormValid = isValid;
      });

    this.formStatusService.order$
      .pipe(takeUntil(this.destroy))
      .subscribe((order) => {
        this.order = order;
      });

    this.irOderCreated$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp) {
        this.openWhatsAppChat(resp);
      }
    });
  }

  calculateTotalSum() {
    this.totalShop = this.selectProducts.reduce(
      (sum, product) => sum + product.total,
      0
    );
  }

  createForm(): FormGroup {
    return this.fb.group({
      productId: null,
      variantId: null,
      referenceId: null,
      name: null,
      enabled: null,
      withVariant: null,
      sku: null,
      discount: null,
      description: null,
      stock: null,
      price: null,
      numberEmergency: null,
      variants: null,
      unit: null,
      state: null,
      category: null,
      files: [],
      categoryId: null,
      quantity: [1, [Validators.required, Validators.min(1)]],
      total: [0, Validators.min(1)],
    });
  }

  updateFooterContent() {
    const currentRoute = this.router.url;

    if (currentRoute.includes('/shop/shopping-cart')) {
      this.normal = false;
      this.cartButtons = true;
      this.shipping = false;
    } else if (currentRoute.includes('/shop/shipping-information')) {
      this.normal = false;
      this.cartButtons = false;
      this.shipping = true;
    } else {
      this.normal = true;
      this.cartButtons = false;
      this.shipping = false;
    }
  }

  redirecToShipping() {
    this.router.navigate(['/shop/shipping-information']);
  }

  finishSale() {
    if (!this.isFormValid) {
      this.matDialog.open(FlayAlertComponent, {
        width: 'auto',
        data: {
          title: '¡Error!',
          type: 'error',
          text: 'Por favor, llena todos los campos del formulario correctamente.',
          saveButtonText: 'Ok',
          hiddeCancelBtn: true,
        },
      });
      return;
    }
    this.formStatusService.finishSale(true);
  }

  openWhatsAppChat(order: IOrderResponse) {
    const store = this.store.selectSnapshot(StoreState.getStore);


    const productList = order.productToOrders
      .map(
        (product) => `
🔘 ${product.product.name}
      Categoría: ${product.product.category.name}
      Varíante: N/A
      Costo: $${(product.product.price * product.quantity).toLocaleString(
        'es-CO'
      )}
—————————————`
      )
      .join('\n');

    const message = `
      ✋🏻Hola, Soy ${order.client.name} ${
      order.client.lastName
    }  quiero concretar un pedido en ${ store.name } con estos productos:

      🟢 Productos
      ————————————-
      ${productList}

      📅 Fecha de envío : ${new Date(order.dateScheduled).toLocaleDateString(
        'es-CO',
        {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }
      )}

      🚚 Costo de domicilio: $${order.deliveryCost.toLocaleString('es-CO')}

      ☑ Cliente: ${order.client.name} ${order.client.lastName}
      ☑ Celular: ${order.client.phone}
      ☑ Ciudad: ${order.client.city.name}
      ☑ Dirección: ${order.address}
      ☑ Info de dirección: Apto 377 Torre 20
      ☑ Barrio: ${this.order.client.neighborhood}

      ——————————————-

      💳 Medio de pago: ${order.paymentMethod.name}
      🟩 Estado de pago: ${order.paymentState.name}
      💰 TOTAL: $${order.total.toLocaleString('es-CO')}
      `;

    const formattedPhone = `57${store.phone}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, '_blank');
  }

  redirecToCatalog() {
    this.router.navigate(['/shop/catalog']);
  }

  increaseQuantity() {
    const currentQuantity = this.productForm.get('quantity')?.value;
    const value = this.productForm.get('total').value;

    if (currentQuantity < this.product?.stock) {
      this.productForm.patchValue({ quantity: currentQuantity + 1 });
      this.productForm.patchValue({ total: value + this.product.price });
    } else {
      this.matDialog.open(FlayAlertComponent, {
        width: 'auto',
        data: {
          title: 'Stock insuficiente',
          type: 'error',
          text: 'No puedes agregar más unidades de las disponibles en stock.',
          saveButtonText: 'Ok',
          hiddeCancelBtn: true,
        },
      });
    }
  }

  decreaseQuantity() {
    const currentQuantity = this.productForm.get('quantity')?.value;
    const value = this.productForm.get('total').value;
    if (currentQuantity > 1) {
      this.productForm.patchValue({ quantity: currentQuantity - 1 });
      this.productForm.patchValue({ total: value - this.product.price });
    }
  }

  addProduct() {
    const currentQuantity = this.productForm.get('quantity')?.value;
    if (this.product?.stock === 0 || currentQuantity > this.product?.stock) {
      this.matDialog.open(FlayAlertComponent, {
        width: 'auto',
        data: {
          title: 'Stock insuficiente',
          type: 'error',
          text: 'No puedes agregar más unidades de las disponibles en stock.',
          saveButtonText: 'Ok',
          hiddeCancelBtn: true,
        },
      });
      return;
    }
    const product = Object.assign({}, this.productForm.getRawValue());
    this.store.dispatch(new AddProductToCarAction(product));
  }

  ngOnDestroy() {
    this.destroy?.next(true);
    this.destroy?.unsubscribe();
  }
}
