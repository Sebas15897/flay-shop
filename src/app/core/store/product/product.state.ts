import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { ProductService } from '../../services/product/product.service';
import {
  GetProductsByStoreAction,
  GetProductByIdAction,
  SetProductsAction,
  SetProductAction,
} from './product.actions';
import { IProduct } from '../../interfaces/product.interface';
import { tap } from 'rxjs/operators';

export class ProductStateModel {
  products: IProduct[];
  selectedProduct: IProduct | null;
}

@State<ProductStateModel>({
  name: 'product',
  defaults: {
    products: [],
    selectedProduct: null,
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
      tap((product: IProduct) => {
        ctx.dispatch(new SetProductAction(product));
      })
    );
  }

  @Action(SetProductsAction)
  setProducts(
    ctx: StateContext<ProductStateModel>,
    { products }: SetProductsAction
  ) {
    ctx.patchState({ products });
  }

  @Action(SetProductAction)
  setProduct(
    ctx: StateContext<ProductStateModel>,
    { product }: SetProductAction
  ) {
    ctx.patchState({ selectedProduct: product });
  }
}
