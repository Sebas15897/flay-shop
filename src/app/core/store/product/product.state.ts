import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { ProductService } from '../../services/product/product.service';
import {
  GetProductsByStoreAction,
  GetProductByIdAction,
  SetProductsAction,
  SetProductAction,
  AddProductToCarAction,
  ClearCarProductsAction,
  RemoveProductFromCarAction,
  DecrementProductQuantityAction,
  IncrementProductQuantityAction,
  ClearProductAction,
} from './product.actions';
import {
  IAddProductCarShop,
  IProduct,
} from '../../interfaces/product.interface';
import { tap } from 'rxjs/operators';
import { FlayAlertComponent } from '../../components/flay-alert/flay-alert.component';
import { MatDialog } from '@angular/material/dialog';

export class ProductStateModel {
  products: IProduct[];
  selectedProduct: IProduct | null;
  carProducts: IAddProductCarShop[];
}

@State<ProductStateModel>({
  name: 'product',
  defaults: {
    products: [],
    selectedProduct: null,
    carProducts: [],
  },
})
@Injectable()
export class ProductState {
  constructor(
    private productService: ProductService,
    private matDialog: MatDialog
  ) {}

  @Selector()
  static getProducts(state: ProductStateModel): IProduct[] {
    return state.products;
  }

  @Selector()
  static getSelectedProduct(state: ProductStateModel): IProduct | null {
    return state.selectedProduct;
  }

  @Selector()
  static getShopCarProducts(state: ProductStateModel): IAddProductCarShop[] {
    return state.carProducts ?? [];
  }

  @Action(GetProductsByStoreAction)
  getProductsByStore(
    ctx: StateContext<ProductStateModel>,
    { tenantId }: GetProductsByStoreAction
  ) {
    return this.productService.getProductByStore(tenantId).pipe(
      tap((resp) => {
        if (resp && resp.data) {
          ctx.dispatch(new SetProductsAction(resp.data as IProduct[]));
        }
      })
    );
  }

  @Action(GetProductByIdAction)
  getProductById(
    ctx: StateContext<ProductStateModel>,
    { payload }: GetProductByIdAction
  ) {
    return this.productService.getProductByProductId(payload).pipe(
      tap((resp) => {
        ctx.dispatch(new SetProductAction(resp.data as IProduct));
      })
    );
  }

  @Action(SetProductsAction)
  setProducts(
    ctx: StateContext<ProductStateModel>,
    { products }: SetProductsAction
  ) {
    return ctx.patchState({ products });
  }

  @Action(SetProductAction)
  setProduct(
    ctx: StateContext<ProductStateModel>,
    { product }: SetProductAction
  ) {
    return ctx.patchState({ selectedProduct: product });
  }

  @Action(AddProductToCarAction)
  AddProductToCarAction(
    ctx: StateContext<ProductStateModel>,
    { product }: AddProductToCarAction
  ) {
    const products = ctx.getState().carProducts;
    const existingProduct = products?.find(
      (p) => p?.productId === product?.productId
    );

    if (existingProduct) {
      const totalQuantity = existingProduct.quantity + product.quantity;
      if (totalQuantity > product.stock) {
        this.errorStock();
        return;
      }
      this.sucessMessage();
      return ctx.dispatch(
        new IncrementProductQuantityAction(
          product?.productId,
          product?.quantity
        )
      );
    } else {
      if (product.quantity > product.stock) {
        this.errorStock();
        return;
      }
      const updatedProducts = [...products, product];
      this.sucessMessage();
      return ctx.patchState({ carProducts: updatedProducts });
    }
  }

  sucessMessage() {
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
  }

  errorStock() {
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

  @Action(RemoveProductFromCarAction)
  removeProductFromCar(
    ctx: StateContext<ProductStateModel>,
    { productId }: RemoveProductFromCarAction
  ) {
    const currentProducts = ctx.getState().carProducts;

    const updatedProducts = currentProducts.filter(
      (product) => product.productId !== productId
    );

    return ctx.patchState({ carProducts: updatedProducts });
  }

  @Action(ClearCarProductsAction)
  clearCarProducts(ctx: StateContext<ProductStateModel>) {
    return ctx.patchState({ carProducts: [] });
  }

  @Action(IncrementProductQuantityAction)
  incrementProductQuantity(
    ctx: StateContext<ProductStateModel>,
    { productId, quantity }: IncrementProductQuantityAction
  ) {
    const state = ctx.getState();
    const updatedProducts = state.carProducts.map((product) => {
      if (product.productId === productId) {
        const newQuantity = product.quantity + quantity;

        return {
          ...product,
          quantity: newQuantity,
          total: product.price * newQuantity,
        };
      }
      return product;
    });

    ctx.patchState({ carProducts: updatedProducts });
  }

  @Action(DecrementProductQuantityAction)
  decrementProductQuantity(
    ctx: StateContext<ProductStateModel>,
    { productId }: DecrementProductQuantityAction
  ) {
    const state = ctx.getState();
    const updatedProducts = state.carProducts.map((product) => {
      if (product.productId === productId && product.quantity > 1) {
        return {
          ...product,
          quantity: product.quantity - 1,
          total: product.price * (product.quantity - 1),
        };
      }
      return product;
    });

    ctx.patchState({ carProducts: updatedProducts });
  }

  @Action(ClearProductAction)
  ClearProductAction(ctx: StateContext<ProductStateModel>) {
    ctx.patchState({ selectedProduct: null, carProducts: [] });
  }
}
