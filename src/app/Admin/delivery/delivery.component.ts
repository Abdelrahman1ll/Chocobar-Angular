import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { BackComponent } from '../../../components/back/back.component';
import { DeliveryService } from './delivery.service';
import { ToastMessageComponent } from '../../../components/toast-message/toast-message.component';
import { Delivery } from './delivery.type';
@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [
    NgIf,
    HeaderComponent,
    FooterComponent,
    BackComponent,
    ReactiveFormsModule,
    NgFor,
    ToastMessageComponent,
  ],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css',
})
export class DeliveryComponent {
  form: FormGroup;
  isLoading = false;
  currentDeliveryPrice: Delivery[] = [];
  toastType: 'success' | 'error' | 'warning' = 'success';
  toastMessage = '';
  showToast = false;
  constructor(
    private deliveryService: DeliveryService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      DeliveryPrice: [null, [Validators.required, Validators.min(0)]],
    });
  }

  updateDeliveryPrice() {
    if (this.form.invalid) return;

    this.isLoading = true;
    const newPrice = this.form.value.DeliveryPrice;

    this.deliveryService.updateDelivery(newPrice).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.form.reset();
        this.toastType = 'success';
        this.toastMessage = 'تم التحديث بنجاح';
        this.showToast = true;
        this.getDelivery();
      },
      error: (err) => {
        this.isLoading = false;
        this.toastType = 'error';
        this.toastMessage = 'فشل التحديث';
        this.showToast = true;
      },
    });
  }

  getDelivery() {
    this.deliveryService.getDelivery().subscribe({
      next: (res) => {
        const price = Array.isArray(res) ? res : [];
        this.currentDeliveryPrice = price;
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit() {
    this.getDelivery();
  }
}
