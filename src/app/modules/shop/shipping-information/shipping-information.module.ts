import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingInformationRoutingModule } from './shipping-information-routing.module';
import { ShippingInformationComponent } from './shipping-information.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ModalPhoneComponent } from './modal-phone/modal-phone.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [ShippingInformationComponent, ModalPhoneComponent],
  imports: [
    CommonModule,
    ShippingInformationRoutingModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
})
export class ShippingInformationModule {}
