import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingInformationRoutingModule } from './shipping-information-routing.module';
import { ShippingInformationComponent } from './shipping-information.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShippingInformationComponent],
  imports: [
    CommonModule,
    ShippingInformationRoutingModule,
    ReactiveFormsModule,
  ],
})

export class ShippingInformationModule {}
