import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../../shared/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((module) => module.HomeModule),
      },
      {
        path: 'catalog',
        loadChildren: () =>
          import('./catalog/catalog.module').then(
            (module) => module.CatalogModule
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./categories/categories.module').then(
            (module) => module.CategoriesModule
          ),
      },
      {
        path: 'shopping-cart',
        loadChildren: () =>
          import('./shopping-cart/shopping-cart.module').then(
            (module) => module.ShoppingCartModule
          ),
      },
      {
        path: 'shipping-information',
        loadChildren: () =>
          import('./shipping-information/shipping-information.module').then(
            (module) => module.ShippingInformationModule
          ),
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
