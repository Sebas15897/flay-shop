import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(
        (module) => module.AuthModule
      ),
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./modules/shop/shop.module').then(
        (module) => module.ShopModule
      ),
  },
  {
    path: '**',
    redirectTo: 'shop',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
