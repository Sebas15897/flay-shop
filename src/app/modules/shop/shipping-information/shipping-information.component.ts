import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipping-information',
  templateUrl: './shipping-information.component.html',
  styleUrls: ['./shipping-information.component.scss'],
})

export class ShippingInformationComponent {
  shippingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.shippingForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      clientId: [null, [Validators.required]],
      address: [null, Validators.maxLength(255)],
      products: this.fb.array([]),
      deliveryCost: [0, [Validators.required, Validators.min(0)]],
      subTotal: [0, [Validators.required, Validators.min(0)]],
      total: [0, [Validators.required, Validators.min(0)]],
      discount: [null, Validators.min(0)],
      notes: [null, Validators.maxLength(255)],
      dateScheduled: [null],
      scheduleId: [null, [Validators.required]],
      orderStateId: [null, [Validators.required]],
      paymentStateId: [null, [Validators.required]],
      paymentMethodId: [null, [Validators.required]],
      /*NO ESTAN*/
      voucherUrl: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      whatsappPhone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      city: ['Bogotá', Validators.required],
      apartmentDetails: [''],
      neighborhood: [''],
      shippingDate: ['', Validators.required],
      paymentStatus: ['Contra entrega', Validators.required],
      paymentMethod: ['Nequi', Validators.required],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.shippingForm.patchValue({
      receipt: file
    });
  }

  onSubmit() {
    if (this.shippingForm.valid) {
      console.log(this.shippingForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }
}
