import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { CategoryService } from '../../services/category/category.service';
import {
  GetProductCategoriesByShopAction,
  SetProductCategoriesAction,
} from './category.actions';
import { ICategory } from '../../interfaces/product.interface';
import { tap } from 'rxjs/operators';

export class CategoryStateModel {
  categories: ICategory[];
}

@State<CategoryStateModel>({
  name: 'category',
  defaults: {
    categories: [],
  },
})

@Injectable()
export class CategoryState {
  constructor(private categoryService: CategoryService) {}

  @Selector()
  static getCategories(state: CategoryStateModel): ICategory[] {
    return state.categories;
  }

  @Action(GetProductCategoriesByShopAction)
  getProductCategoriesByShop(
    ctx: StateContext<CategoryStateModel>,
    { tenantId }: GetProductCategoriesByShopAction
  ) {
    return this.categoryService.getProductCategoriesByShop(tenantId).pipe(
      tap((categories: ICategory[]) => {
        ctx.dispatch(new SetProductCategoriesAction(categories));
      })
    );
  }

  @Action(SetProductCategoriesAction)
  setProductCategories(
    ctx: StateContext<CategoryStateModel>,
    { categories }: SetProductCategoriesAction
  ) {
    ctx.patchState({ categories });
  }
}
