
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { RentalService } from '../services/rental/rental.service';
import { GearItemService } from '../services/gear-item/gear-item.service';
import { ReturnRecordService, ReturnRecordRequest, ReturnRecordResponse } from '../services/return-record/return-record.service';

interface ReturnItem {
  rentalDetailId: number;
  gearItemId: number;
  itemName: string;
  itemImage: string;
  quantityRented: number;
  quantityReturned: number;
  damagedQuantity: number;
  lostQuantity: number;
}

interface Rental {
  rentalId: number;
  rentalCode: string;
  customerName: string;
  returnDate: string;
  status: string;
  totalItems: number;
  items: ReturnItem[];
}

@Component({
  selector: 'app-return-records',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './return-records.component.html',
  styleUrl: './return-records.component.css'
})
export class ReturnRecordsComponent implements OnInit {

  searchText = '';
  statusFilter = 'Semua Status';

  rentalSvc = inject(RentalService);
  gearSvc = inject(GearItemService);
  returnSvc = inject(ReturnRecordService);

  rentals: Rental[] = [];
  selectedRental: Rental | null = null;
  actualReturnDate = this.getCurrentDateTime();
  notes = '';

  totalLateFee = 0;
  totalDamageFee = 0;
  totalLostItemFee = 0;
  feesVisible = false;
  isSaving = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.loadRentals();
  }

  loadRentals(): void {
    this.gearSvc.getGearItems().subscribe({
      next: (gears) => {
        const imageByGear = new Map<number, string>();
        gears.forEach(g => imageByGear.set(g.gearItemId, g.imageUrl || ''));

        this.rentalSvc.getRentals().subscribe({
          next: (res) => {
            this.rentals = (res.data || []).map(r => ({
              rentalId: r.rentalId,
              rentalCode: r.rentalCode,
              customerName: r.customerName,
              returnDate: r.plannedReturnDate,
              status: r.status,
              totalItems: r.details.length,
              items: r.details.map(d => ({
                rentalDetailId: d.rentalDetailId,
                gearItemId: d.gearItemId,
                itemName: d.gearName,
                itemImage: imageByGear.get(d.gearItemId) || '',
                quantityRented: d.quantity,
                quantityReturned: d.quantity,
                damagedQuantity: 0,
                lostQuantity: 0
              }))
            }));

            if (!this.selectedRental && this.rentals.length > 0) {
              this.selectedRental = this.rentals[0];
            }
          },
          error: (err) => console.error('Error loading rentals:', err)
        });
      },
      error: (err) => console.error('Error loading gear items:', err)
    });
  }

  get filteredRentals(): Rental[] {
    return this.rentals.filter(rental => {
      const keyword = this.searchText.toLowerCase();
      const matchesSearch =
        rental.rentalCode.toLowerCase().includes(keyword) ||
        rental.customerName.toLowerCase().includes(keyword);
      const matchesStatus =
        this.statusFilter === 'Semua Status' ||
        rental.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  selectRental(rental: Rental): void {
    this.selectedRental = rental;
    this.actualReturnDate = this.getCurrentDateTime();
    this.notes = '';
    this.resetFees();
  }

  getTotalReturned(): number {
    if (!this.selectedRental) return 0;
    return this.selectedRental.items.reduce((t, i) => t + i.quantityReturned, 0);
  }

  get totalReturnFee(): number {
    return this.totalLateFee + this.totalDamageFee + this.totalLostItemFee;
  }

  saveReturn(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.selectedRental) {
      this.errorMessage = 'Silakan pilih data penyewaan terlebih dahulu.';
      return;
    }

    const requests: ReturnRecordRequest[] = [];

    for (const item of this.selectedRental.items) {
      const total = item.quantityReturned + item.damagedQuantity + item.lostQuantity;
      if (total !== item.quantityRented) {
        this.errorMessage = `Jumlah kembali + rusak + hilang untuk ${item.itemName} harus sama dengan ${item.quantityRented}.`;
        return;
      }

      requests.push({
        rentalId: this.selectedRental.rentalId,
        rentalDetailId: item.rentalDetailId,
        quantityReturned: item.quantityReturned,
        damagedQuantity: item.damagedQuantity,
        lostQuantity: item.lostQuantity,
        notes: this.notes,
        actualReturnDate: this.actualReturnDate
      });
    }

    this.isSaving = true;
    forkJoin(requests.map(req => this.returnSvc.createReturn(req))).subscribe({
      next: (responses: ReturnRecordResponse[]) => {
        this.totalLateFee = responses.reduce((s, r) => s + r.lateFee, 0);
        this.totalDamageFee = responses.reduce((s, r) => s + r.damageFee, 0);
        this.totalLostItemFee = responses.reduce((s, r) => s + r.lostItemFee, 0);
        this.feesVisible = true;
        this.isSaving = false;
        this.successMessage = 'Data pengembalian berhasil disimpan.';
        this.loadRentals();
      },
      error: (err) => {
        this.isSaving = false;
        this.errorMessage = err?.error?.message || 'Gagal menyimpan data pengembalian.';
      }
    });
  }

  private resetFees(): void {
    this.totalLateFee = 0;
    this.totalDamageFee = 0;
    this.totalLostItemFee = 0;
    this.feesVisible = false;
  }

  private getCurrentDateTime(): string {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  }
}
