
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RentalService } from '../services/rental/rental.service';
import { CustomerService } from '../services/customer/customer.service';
import { GearItemService } from '../services/gear-item/gear-item.service';
import { Customer } from '../shared/types/customer.model';
import { GearItem } from '../shared/types/gear-item.model';
import {
  RentalDetailRequest,
  RentalRequest,
  RentalResponse
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
  private customerService = inject(CustomerService);
  private gearItemService = inject(GearItemService);

  rentals: RentalResponse[] = [];
  customers: Customer[] = [];
  gearItems: GearItem[] = [];

  isLoading = false;
  isSaving = false;

  errorMessage = '';
  successMessage = '';

  searchKeyword = '';

  // Form penyewaan
  customerId = 0;
  plannedStartDate = '';
  plannedReturnDate = '';

  // Input barang
  gearItemId = 0;
  quantity = 1;

  // Daftar detail barang yang akan dikirim ke backend (plus nama untuk tampilan)
  rentalDetails: (RentalDetailRequest & { gearName?: string })[] = [];

  // Detail transaksi yang sedang dilihat
  selectedRental: RentalResponse | null = null;

  ngOnInit(): void {
    this.loadRentals();
    this.loadCustomers();
    this.loadGearItems();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => this.customers = data ?? [],
      error: () => {}
    });
  }

  loadGearItems(): void {
    this.gearItemService.getGearItems().subscribe({
      next: (data) => {
        // Hanya ambil yang aktif dan stok tersedia > 0
        this.gearItems = (data ?? []).filter(g => g.isActive && (g.availableStock ?? 0) > 0);
      },
      error: () => {}
    });
  }

  // Mengambil daftar rental dari backend
  loadRentals(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.rentalService.getRentals().subscribe({
      next: (response) => {
        this.rentals = response.data ?? [];
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage =
          error?.error?.message ||
          'Gagal mengambil data penyewaan dari server.';
      }
    });
  }

  // Filter pencarian transaksi
  get filteredRentals(): RentalResponse[] {
    const keyword = this.searchKeyword.trim().toLowerCase();

    if (!keyword) {
      return this.rentals;
    }

    return this.rentals.filter((rental) =>
      rental.rentalCode?.toLowerCase().includes(keyword) ||
      rental.customerName?.toLowerCase().includes(keyword) ||
      rental.status?.toLowerCase().includes(keyword) ||
      rental.paymentStatus?.toLowerCase().includes(keyword)
    );
  }

  // Statistik berdasarkan data dari backend
  get totalRentals(): number {
    return this.rentals.length;
  }

  get ongoingRentals(): number {
    return this.rentals.filter(
      rental => rental.status?.toLowerCase() === 'ongoing'
    ).length;
  }

  get unpaidRentals(): number {
    return this.rentals.filter(
      rental => rental.paymentStatus?.toLowerCase() === 'unpaid'
    ).length;
  }

  getSelectedGear(): GearItem | undefined {
    return this.gearItems.find(g => g.gearItemId === Number(this.gearItemId));
  }

  // Menambahkan barang ke detail transaksi
  addGearDetail(): void {
    this.errorMessage = '';
    this.successMessage = '';

    const gear = this.getSelectedGear();
    if (!gear) {
      this.errorMessage = 'Pilih peralatan terlebih dahulu.';
      return;
    }

    if (!Number.isInteger(this.quantity) || this.quantity <= 0) {
      this.errorMessage = 'Jumlah barang minimal 1.';
      return;
    }

    if (this.quantity > (gear.availableStock ?? 0)) {
      this.errorMessage = `Jumlah melebihi stok tersedia (${gear.availableStock}).`;
      return;
    }

    const isDuplicate = this.rentalDetails.some(
      detail => detail.gearItemId === gear.gearItemId
    );

    if (isDuplicate) {
      this.errorMessage = 'Barang tersebut sudah ditambahkan.';
      return;
    }

    this.rentalDetails.push({
      gearItemId: gear.gearItemId,
      quantity: this.quantity,
      gearName: gear.gearName
    });

    this.gearItemId = 0;
    this.quantity = 1;
  }

  // Menghapus barang dari detail transaksi
  removeGearDetail(index: number): void {
    this.rentalDetails.splice(index, 1);
  }

  // Validasi tanggal di sisi frontend
  get isDateValid(): boolean {
    if (!this.plannedStartDate || !this.plannedReturnDate) {
      return false;
    }

    return this.plannedReturnDate >= this.plannedStartDate;
  }

  // Mengirim transaksi rental ke backend
  submitRental(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!Number.isInteger(this.customerId) || this.customerId <= 0) {
      this.errorMessage = 'Pilih customer terlebih dahulu.';
      return;
    }

    if (!this.plannedStartDate || !this.plannedReturnDate) {
      this.errorMessage = 'Tanggal mulai dan tanggal pengembalian wajib diisi.';
      return;
    }

    if (!this.isDateValid) {
      this.errorMessage = 'Tanggal pengembalian tidak boleh sebelum tanggal mulai.';
      return;
    }

    if (this.rentalDetails.length === 0) {
      this.errorMessage = 'Tambahkan minimal satu barang yang akan disewa.';
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

        if (response.data) {
          this.successMessage = 'Transaksi penyewaan berhasil dibuat.';

          // Memuat ulang daftar agar data mengikuti hasil backend
          this.resetForm();
          this.loadRentals();
          this.loadGearItems();
        } else {
          this.errorMessage = 'Transaksi berhasil diproses, tetapi data tidak ditemukan.';
        }
      },
      error: (error) => {
        this.isSaving = false;

        this.errorMessage =
          error?.error?.message ||
          this.getValidationError(error) ||
          'Gagal membuat transaksi penyewaan.';
      }
    });
  }

  // Mengambil pesan validasi dari ASP.NET Core jika tersedia
  private getValidationError(error: any): string {
    const errors = error?.error?.errors;

    if (!errors) {
      return '';
    }

    const messages = Object.values(errors)
      .flat()
      .filter((message): message is string => typeof message === 'string');

    return messages.join(' ');
  }

  // Mengosongkan form setelah transaksi berhasil
  resetForm(): void {
    this.customerId = 0;
    this.plannedStartDate = '';
    this.plannedReturnDate = '';

    this.gearItemId = 0;
    this.quantity = 1;

    this.rentalDetails = [];
  }

  // Menampilkan detail transaksi
  showRentalDetail(rental: RentalResponse): void {
    this.selectedRental = rental;
  }

  // Menutup detail transaksi
  closeRentalDetail(): void {
    this.selectedRental = null;
  }

  // Kelas tampilan status rental
  getStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
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

  // Kelas tampilan status pembayaran
  getPaymentClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'payment-paid';

      case 'unpaid':
        return 'payment-unpaid';

      default:
        return 'payment-default';
    }
  }

  // Label status agar lebih mudah dibaca
  getStatusLabel(status: string): string {
    switch (status?.toLowerCase()) {
      case 'ongoing':
        return 'Berlangsung';

      case 'returned':
        return 'Dikembalikan';

      case 'completed':
        return 'Selesai';

      default:
        return status || '-';
    }
  }

  getPaymentLabel(status: string): string {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'Lunas';

      case 'unpaid':
        return 'Belum Lunas';

      default:
        return status || '-';
    }
  }
}