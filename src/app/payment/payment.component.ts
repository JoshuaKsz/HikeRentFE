
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { PaymentService } from '../services/payment/payment.service';
import { PaymentResponse } from '../shared/types/payment.model';
import { RentalResponse } from '../shared/types/rental.model';

interface PaymentRow extends PaymentResponse {
  isPending: boolean;
}

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  private paymentService = inject(PaymentService);

  rows: PaymentRow[] = [];
  searchText = '';
  selectedStatus = 'Semua';
  isLoading = false;
  isProcessing = false;
  errorMessage = '';
  successMessage = '';
  selectedPayment: PaymentRow | null = null;
  selectedPendingRental: PaymentRow | null = null;
  paymentMethod = 'Cash';

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.errorMessage = '';

    forkJoin({
      payments: this.paymentService.getPayments(),
      pending: this.paymentService.getPendingPayments()
    }).subscribe({
      next: (result) => {
        const paidRows: PaymentRow[] = (result.payments.data ?? []).map(
          payment => ({ ...payment, isPending: false })
        );

        const pendingRows: PaymentRow[] = (result.pending.data ?? []).map(
          (rental: RentalResponse) => ({
            paymentId: 0,
            paymentCode: '-',
            rentalId: rental.rentalId,
            rentalCode: rental.rentalCode,
            customerName: rental.customerName,
            amount: rental.grandTotal,
            grandTotal: rental.grandTotal,
            paymentMethod: '-',
            paymentDate: '',
            paymentStatus: 'Unpaid',
            isPending: true
          })
        );

        this.rows = [...pendingRows, ...paidRows];
        this.isLoading = false;
      },
      error: (error) => {
        this.rows = [];
        this.errorMessage =
          error.error?.message || 'Gagal mengambil data pembayaran.';
        this.isLoading = false;
      }
    });
  }

  loadPayments(): void {
    this.loadData();
  }

  openPayModal(row: PaymentRow): void {
    this.selectedPendingRental = row;
    this.paymentMethod = 'Cash';
  }

  closePayModal(): void {
    this.selectedPendingRental = null;
  }

  processPayment(): void {
    if (!this.selectedPendingRental) {
      return;
    }

    this.isProcessing = true;
    this.errorMessage = '';

    this.paymentService
      .createPayment(this.selectedPendingRental.rentalId, {
        paymentMethod: this.paymentMethod
      })
      .subscribe({
        next: () => {
          this.successMessage = 'Pembayaran berhasil diproses.';
          this.selectedPendingRental = null;
          this.isProcessing = false;
          this.loadData();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.errorMessage =
            error.error?.message || 'Gagal memproses pembayaran.';
          this.isProcessing = false;
        }
      });
  }

  get filteredPayments(): PaymentRow[] {
    const keyword = this.searchText.trim().toLowerCase();

    return this.rows.filter(payment => {
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
    return this.rows.length;
  }

  get totalPaid(): number {
    return this.rows
      .filter(payment => payment.paymentStatus?.toLowerCase() === 'paid')
      .reduce((total, payment) => total + payment.amount, 0);
  }

  get totalUnpaid(): number {
    return this.rows
      .filter(payment => payment.paymentStatus?.toLowerCase() === 'unpaid')
      .reduce((total, payment) => total + payment.amount, 0);
  }

  showDetail(payment: PaymentRow): void {
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
