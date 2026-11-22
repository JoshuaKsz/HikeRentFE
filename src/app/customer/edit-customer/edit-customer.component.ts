import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer/customer.service';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent implements OnInit {
  private customerService = inject(CustomerService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  customerId = 0;
  isLoading = false;
  isSaving = false;
  errorMessage = '';

  customer = {
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    identityNumber: ''
  };

  ngOnInit(): void {
    this.customerId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.customerId) {
      this.errorMessage = 'ID customer tidak valid.';
      return;
    }

    this.loadCustomer();
  }

  loadCustomer(): void {
    this.isLoading = true;

    this.customerService.getCustomerById(this.customerId).subscribe({
      next: (response) => {
        const data = response as any;

        this.customer = {
          fullName: data.fullName ?? '',
          email: data.email ?? '',
          phoneNumber: data.phoneNumber ?? '',
          address: data.address ?? '',
          identityNumber: data.identityNumber ?? ''
        };

        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message ?? 'Gagal memuat data customer.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (
      !this.customer.fullName.trim() ||
      !this.customer.email.trim() ||
      !this.customer.phoneNumber.trim() ||
      !this.customer.address.trim() ||
      !this.customer.identityNumber.trim()
    ) {
      this.errorMessage = 'Semua field wajib diisi.';
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';

    this.customerService.updateCustomer(
      this.customerId,
      this.customer
    ).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(['/customer']);
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message ?? 'Gagal memperbarui customer.';
        this.isSaving = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/customer']);
  }
}