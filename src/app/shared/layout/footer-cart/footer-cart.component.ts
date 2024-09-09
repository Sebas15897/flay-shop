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

@Component({
  selector: 'app-footer-cart',
  templateUrl: './footer-cart.component.html',
  styleUrls: ['./footer-cart.component.scss'],
})
export class FooterCartComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  product$: Observable<IProduct> = new Observable();
  product: IProduct = null;

  selectProducts$: Observable<IAddProductCarShop[]> = new Observable();
  selectProducts: IAddProductCarShop[] = null;

  cartButtons: boolean = true;
  normal: boolean = true;
  shipping: boolean = false;

  productForm: FormGroup;

  totalShop: number = 0;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store,
    private matDialog: MatDialog
  ) {
    this.productForm = this.createForm();
    this.product$ = this.store.select(ProductState.getSelectedProduct);
    this.selectProducts$ = this.store.select(ProductState.getShopCarProducts);
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
          id: resp.id,
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
          file: resp.file,
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
  }

  calculateTotalSum() {
    this.totalShop = this.selectProducts.reduce(
      (sum, product) => sum + product.total,
      0
    );
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: null,
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
      file: [],
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
/*     this.openWhatsAppChat(); */
  }

  openWhatsAppChat() {
    // Supongamos que tienes los detalles del producto y precios en tu componente
    const productName = 'Nombre del Producto'; // Reemplaza con el nombre real del producto
    const productDescription = 'Descripción del producto'; // Reemplaza con la descripción real
    const quantity = 1; // Reemplaza con la cantidad real
    const unitPrice = 10000; // Precio unitario
    const subtotal = 10000; // Subtotal
    const total = 10000; // Total del pedido

    // Crear el mensaje en el formato deseado
    const message = `
    🛒 *Carrito de Compras*

    *Producto:* ${productName}
    *Cantidad:* ${quantity}
    *Descripción:* ${productDescription}
    *Precio Unitario:* $${unitPrice.toLocaleString('es-CO')}

    ---

    *Subtotal:* $${subtotal.toLocaleString('es-CO')}
    *Total del Pedido:* $${total.toLocaleString('es-CO')}

    Gracias por tu compra. Si tienes alguna pregunta, no dudes en contactarnos.
        `;
    const formattedPhone = `573244692094`; // Asegúrate de agregar el código del país si no está incluido
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodeURIComponent(
      message
    )}`;

    // Abrir el chat de WhatsApp
    window.open(whatsappUrl, '_blank');
  }

  redirecToCatalog() {
    this.router.navigate(['/shop/catalog']);
  }

  increaseQuantity() {
    const currentQuantity = this.productForm.get('quantity')?.value;
    const value = this.productForm.get('total').value;
    this.productForm.patchValue({ quantity: currentQuantity + 1 });
    this.productForm.patchValue({ total: value + this.product.price });
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
    this.matDialog.open(FlayAlertComponent, {
      width: 'auto',
      data: {
        title: 'Agregar al carrito',
        type: 'success',
        text: `¡Producto agregado con éxito!`,
        saveButtonText: 'Ok',
        hiddeCancelBtn: true,
      },
    });
    this.router.navigate(['/shop/catalog']);
    const product = Object.assign({}, this.productForm.getRawValue());
    this.store.dispatch(new AddProductToCarAction(product));
  }

  ngOnDestroy() {
    this.destroy?.next(true);
    this.destroy?.unsubscribe();
  }
}
