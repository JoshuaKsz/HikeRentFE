
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../services/payment/payment.service';
import { PaymentResponse } from '../shared/types/payment.model';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  private paymentService = inject(PaymentService);

  payments: PaymentResponse[] = [];
  searchText = '';
  selectedStatus = 'Semua';
  isLoading = false;
  errorMessage = '';
  selectedPayment: PaymentResponse | null = null;

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.paymentService.getPayments().subscribe({
      next: (response) => {
        this.payments = response.data ?? [];
        this.isLoading = false;
      },
      error: (error) => {
        this.payments = [];
        this.errorMessage =
          error.error?.message || 'Gagal mengambil data pembayaran.';
        this.isLoading = false;
      }
    });
  }

  get filteredPayments(): PaymentResponse[] {
    const keyword = this.searchText.trim().toLowerCase();

    return this.payments.filter(payment => {
      const matchesSearch =
        (payment.paymentCode ?? '').toLowerCase().includes(keyword) ||
        (payment.rentalCode ?? '').toLowerCase().includes(keyword) ||
        (payment.customerName ?? '').toLowerCase().includes(keyword);

      const matchesStatus =
        this.selectedStatus === 'Semua' ||
        (payment.paymentStatus ?? '').toLowerCase() ===
        this.selectedStatus.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }

  get totalPayments(): number {
    return this.payments.length;
  }

  get totalPaid(): number {
    return this.payments
      .filter(payment => payment.paymentStatus?.toLowerCase() === 'paid')
      .reduce((total, payment) => total + payment.amount, 0);
  }

  get totalUnpaid(): number {
    return this.payments
      .filter(payment => payment.paymentStatus?.toLowerCase() === 'unpaid')
      .reduce((total, payment) => total + payment.amount, 0);
  }

  showDetail(payment: PaymentResponse): void {
    this.selectedPayment = payment;
  }

  closeDetail(): void {
    this.selectedPayment = null;
  }

  formatRupiah(value: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(value ?? 0);
  }

  formatDate(value: string): string {
    if (!value) {
      return '-';
    }

    return new Date(value).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  getStatusClass(status: string): string {
    switch ((status ?? '').toLowerCase()) {
      case 'paid':
        return 'status-paid';
      case 'unpaid':
        return 'status-unpaid';
      default:
        return 'status-default';
    }
  }
}
