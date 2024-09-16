import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

interface IAlertOptions {
  type: 'error' | 'success' | 'warning' | 'sale';
  title?: string;
  text?: string;
  hiddeCancelBtn?: boolean;
  saveButtonText: string;
  cancelButtonText: string;
}

@Component({
  selector: 'app-flay-alert',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './flay-alert.component.html',
  styleUrls: ['./flay-alert.component.scss'],
})

export class FlayAlertComponent {
  constructor(
    public dialogRef: MatDialogRef<FlayAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAlertOptions
  ) {}

  getAlertImg(): string {
    switch (this.data.type) {
      case 'error':
        return 'assets/Icon-alert-error.svg';
      case 'success':
        return 'assets/Icon-Success.svg';
      case 'warning':
        return 'assets/Icon-Alert.svg';
      default:
        return 'assets/Icon-Alert.svg';
    }
  }
}
