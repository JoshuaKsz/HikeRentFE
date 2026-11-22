import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer/customer.service';

@Component({
  selector: 'app-tambah-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tambah-customer.component.html',
  styleUrl: './tambah-customer.component.css'
})
export class TambahCustomerComponent {
  private customerService = inject(CustomerService);
  private router = inject(Router);

  customer = {
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    identityNumber: ''
  };

  isLoading = false;
  errorMessage = '';

  onSubmit(): void {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.customerService.createCustomer(this.customer).subscribe({
      next: () => {
        this.router.navigate(['/customer']);
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message || 'Gagal menambahkan customer.';
        this.isLoading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/customer']);
  }
}