import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IProduct } from '../../../core/interfaces/product.interface';
import { ProductState } from '../../../core/store/product/product.state';
import { Store } from '@ngxs/store';
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

  selectProducts: IProduct[] = [];

  cartButtons: boolean = true;
  normal: boolean = true;
  shipping: boolean = false;

  productForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store,
    private matDialog: MatDialog
  ) {
    this.productForm = this.createForm();
    this.product$ = this.store.select(ProductState.getSelectedProduct);
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
        this.product = resp;
        this.productForm.get('total').setValue(resp?.price ?? 0);
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
      total: [0, Validators.min(1)],
      units: new FormControl(1, [Validators.required, Validators.min(1)]),
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

  redirecToCatalog() {
    this.router.navigate(['/shop/catalog']);
  }

  increaseQuantity() {
    const currentQuantity = this.productForm.get('quantity')?.value;
    const value = this.productForm.get('total').value;
    this.productForm.patchValue({ quantity: currentQuantity + 1 });
    this.productForm.patchValue({ total: value + this.product.price });
    this.selectProducts.push(this.product);
  }

  decreaseQuantity() {
    const currentQuantity = this.productForm.get('quantity')?.value;
    const value = this.productForm.get('total').value;
    if (currentQuantity > 1) {
      this.productForm.patchValue({ quantity: currentQuantity - 1 });
      this.productForm.patchValue({ total: value - this.product.price });
      this.selectProducts.pop();
    }
  }

  addProduct() {
/*     const formValues = this.productForm.value;
    this.matDialog.open(FlayAlertComponent, {
      width: 'auto',
      data: {
        title: 'Agregar al carrito',
        type: 'warning',
        text: `¿Desea agregar ${formValues?.quantity} ${this.product?.name} al carrito?`,
        saveButtonText: 'Agregar',
        cancelButtonText: 'Cancelar',
      },
    }); */
  }

  ngOnDestroy() {
    this.destroy?.next(true);
    this.destroy?.unsubscribe();
  }
}
