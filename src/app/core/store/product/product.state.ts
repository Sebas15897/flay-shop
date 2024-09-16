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
} from './product.actions';
import {
  IAddProductCarShop,
  IProduct,
} from '../../interfaces/product.interface';
import { tap } from 'rxjs/operators';

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
  constructor(private productService: ProductService) {}

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
    const existingProduct = products?.find((p) => p?.id === product?.id);
    const updatedProducts = [...products, product];

    if (existingProduct) {
      return ctx.dispatch(new IncrementProductQuantityAction(product?.id));
    } else {
      return ctx.patchState({ carProducts: updatedProducts });
    }
  }

  @Action(RemoveProductFromCarAction)
  removeProductFromCar(
    ctx: StateContext<ProductStateModel>,
    { productId }: RemoveProductFromCarAction
  ) {
    const currentProducts = ctx.getState().carProducts;

    const updatedProducts = currentProducts.filter(
      (product) => product.id !== productId
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
    { productId }: IncrementProductQuantityAction
  ) {
    const state = ctx.getState();
    const updatedProducts = state.carProducts.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          quantity: product.quantity + 1,
          total: product.price * (product.quantity + 1),
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
      if (product.id === productId && product.quantity > 1) {
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
}
