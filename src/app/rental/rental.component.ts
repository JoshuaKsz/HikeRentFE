
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RentalService } from '../services/rental/rental.service';

import {
  RentalRequest,
  RentalResponse,
  RentalDetailRequest
} from '../shared/types/rental.model';

@Component({
  selector: 'app-rental',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rental.component.html',
  styleUrl: './rental.component.css'
})
export class RentalComponent implements OnInit {

  private rentalService = inject(RentalService);

  // Data transaksi rental dari Backend
  rentals: RentalResponse[] = [];

  // Status halaman
  isLoading = false;
  isSaving = false;

  errorMessage = '';
  successMessage = '';

  // Form rental
  customerId = 0;
  plannedStartDate = '';
  plannedReturnDate = '';

  // Input alat
  gearItemId = 0;
  quantity = 1;

  // Detail alat yang akan disewa
  rentalDetails: RentalDetailRequest[] = [];

  // Pencarian transaksi
  searchKeyword = '';

  // Detail transaksi yang dipilih
  selectedRental: RentalResponse | null = null;

  constructor() {}

  ngOnInit(): void {
    this.getRentals();
  }

  // =====================================
  // MENGAMBIL DATA RENTAL
  // =====================================

  getRentals(): void {

    this.isLoading = true;
    this.errorMessage = '';

    this.rentalService.getRentals().subscribe({

      next: (response) => {

        this.rentals = response.data ?? [];

        this.isLoading = false;

      },

      error: (error) => {

        console.error('Gagal mengambil data rental:', error);

        this.errorMessage =
          error.error?.message ||
          'Gagal mengambil data rental. Periksa koneksi Backend.';

        this.isLoading = false;

      }

    });

  }

  // =====================================
  // FILTER DATA RENTAL
  // =====================================

  get filteredRentals(): RentalResponse[] {

    const keyword = this.searchKeyword.toLowerCase().trim();

    if (!keyword) {
      return this.rentals;
    }

    return this.rentals.filter(rental =>

      rental.rentalCode.toLowerCase().includes(keyword) ||

      rental.customerName.toLowerCase().includes(keyword) ||

      rental.status.toLowerCase().includes(keyword) ||

      rental.paymentStatus.toLowerCase().includes(keyword)

    );

  }

  // =====================================
  // STATISTIK
  // =====================================

  getTotalRental(): number {

    return this.rentals.length;

  }

  getUnpaidRentalCount(): number {

    return this.rentals.filter(

      rental => rental.paymentStatus === 'Unpaid'

    ).length;

  }

  getTotalRentalFee(): number {

    return this.rentals.reduce(

      (total, rental) => total + rental.totalRentalFee,

      0

    );

  }

  // =====================================
  // MENGHITUNG DURASI TANGGAL
  // HANYA UNTUK INFORMASI FORM
  // =====================================

  getRentalDuration(): number {

    if (!this.plannedStartDate || !this.plannedReturnDate) {
      return 0;
    }

    const start = new Date(
      this.plannedStartDate + 'T00:00:00'
    );

    const end = new Date(
      this.plannedReturnDate + 'T00:00:00'
    );

    const difference = end.getTime() - start.getTime();

    if (difference < 0) {
      return 0;
    }

    return Math.floor(
      difference / (1000 * 60 * 60 * 24)
    ) + 1;

  }

  // =====================================
  // MENAMBAHKAN ALAT KE FORM
  // =====================================

  addGear(): void {

    this.errorMessage = '';
    this.successMessage = '';

    if (this.gearItemId <= 0) {

      this.errorMessage = 'ID alat harus lebih besar dari 0.';
      return;

    }

    if (this.quantity <= 0 || !Number.isInteger(this.quantity)) {

      this.errorMessage = 'Jumlah alat harus berupa bilangan bulat positif.';
      return;

    }

    const existingGear = this.rentalDetails.find(

      detail => detail.gearItemId === this.gearItemId

    );

    if (existingGear) {

      this.errorMessage =
        'Alat tersebut sudah ditambahkan. Silakan ubah jumlahnya.';

      return;

    }

    this.rentalDetails.push({

      gearItemId: this.gearItemId,

      quantity: this.quantity

    });

    this.gearItemId = 0;
    this.quantity = 1;

  }

  // =====================================
  // MENGHAPUS ALAT DARI FORM
  // =====================================

  removeGear(index: number): void {

    this.rentalDetails.splice(index, 1);

  }

  // =====================================
  // VALIDASI FORM
  // =====================================

  validateRental(): boolean {

    if (this.customerId <= 0) {

      this.errorMessage = 'ID customer wajib diisi.';
      return false;

    }

    if (!this.plannedStartDate || !this.plannedReturnDate) {

      this.errorMessage = 'Tanggal mulai dan pengembalian wajib diisi.';
      return false;

    }

    if (this.plannedReturnDate < this.plannedStartDate) {

      this.errorMessage =
        'Tanggal pengembalian tidak boleh lebih awal dari tanggal mulai sewa.';

      return false;

    }

    if (this.rentalDetails.length === 0) {

      this.errorMessage =
        'Tambahkan minimal satu alat untuk transaksi rental.';

      return false;

    }

    return true;

  }

  // =====================================
  // MENYIMPAN TRANSAKSI RENTAL
  // =====================================

  saveRental(): void {

    this.errorMessage = '';
    this.successMessage = '';

    if (!this.validateRental()) {
      return;
    }

    const request: RentalRequest = {

      customerId: this.customerId,

      plannedStartDate: this.plannedStartDate,

      plannedReturnDate: this.plannedReturnDate,

      details: this.rentalDetails.map(detail => ({

        gearItemId: detail.gearItemId,

        quantity: detail.quantity

      }))

    };

    this.isSaving = true;

    this.rentalService.createRental(request).subscribe({

      next: (response) => {

        this.isSaving = false;

        this.successMessage =
          response.message || 'Rental berhasil dibuat.';

        // Memperbarui daftar menggunakan data dari Backend
        this.getRentals();

        // Mengosongkan form
        this.resetForm();

      },

      error: (error) => {

        console.error('Gagal menyimpan rental:', error);

        this.isSaving = false;

        this.errorMessage =
          error.error?.message ||
          'Gagal menyimpan rental. Periksa kembali data dan koneksi Backend.';

      }

    });

  }

  // =====================================
  // RESET FORM
  // =====================================

  resetForm(): void {

    this.customerId = 0;

    this.plannedStartDate = '';

    this.plannedReturnDate = '';

    this.gearItemId = 0;

    this.quantity = 1;

    this.rentalDetails = [];

  }

  // =====================================
  // MELIHAT DETAIL TRANSAKSI
  // =====================================

  viewRentalDetail(rental: RentalResponse): void {

    this.selectedRental = rental;

  }

  closeRentalDetail(): void {

    this.selectedRental = null;

  }

  // =====================================
  // STATUS RENTAL
  // =====================================

  getStatusClass(status: string): string {

    switch (status.toLowerCase()) {

      case 'ongoing':
        return 'status-ongoing';

      case 'returned':
        return 'status-returned';

      case 'completed':
        return 'status-completed';

      default:
        return 'status-default';

    }

  }

  // =====================================
  // STATUS PEMBAYARAN
  // =====================================

  getPaymentClass(status: string): string {

    switch (status.toLowerCase()) {

      case 'paid':
        return 'payment-paid';

      case 'unpaid':
        return 'payment-unpaid';

      default:
        return 'payment-default';

    }

  }

}
