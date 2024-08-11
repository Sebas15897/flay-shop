import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingInformationRoutingModule } from './shipping-information-routing.module';
import { ShippingInformationComponent } from './shipping-information.component';

@NgModule({
  declarations: [ShippingInformationComponent],
  imports: [CommonModule, ShippingInformationRoutingModule],
})

export class ShippingInformationModule {}
