import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippingInformationComponent } from './shipping-information.component';

export const routes: Routes = [
  {
    path: '',
    component: ShippingInformationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ShippingInformationRoutingModule {}
