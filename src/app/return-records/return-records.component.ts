
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ReturnItem {
  rentalDetailId: number;
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

interface Staff {
  userId: number;
  fullName: string;
}

@Component({
  selector: 'app-return-records',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './return-records.component.html',
  styleUrl: './return-records.component.css'
})
export class ReturnRecordsComponent {

  searchText = '';
  statusFilter = 'Semua Status';

  rentals: Rental[] = [
    {
      rentalId: 1,
      rentalCode: 'RENT001',
      customerName: 'Andi Pratama',
      returnDate: '2026-11-21',
      status: 'Menunggu',
      totalItems: 1,
      items: [
        {
          rentalDetailId: 101,
          itemName: 'Tenda Dome 4P',
          itemImage: 'assets/tenda.png',
          quantityRented: 1,
          quantityReturned: 1,
          damagedQuantity: 0,
          lostQuantity: 0
        }
      ]
    }
  ];

  staffList: Staff[] = [
    {
      userId: 1,
      fullName: 'Andi Pratama'
    }
  ];

  selectedRental: Rental | null = this.rentals[0];

  selectedUserId = 1;

  actualReturnDate = this.getCurrentDateTime();

  notes = '';

  totalLateFee = 0;
  totalDamageFee = 0;
  totalLostItemFee = 0;

  get totalReturnFee(): number {
    return (
      this.totalLateFee +
      this.totalDamageFee +
      this.totalLostItemFee
    );
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
    this.selectedUserId = 1;
    this.actualReturnDate = this.getCurrentDateTime();
    this.notes = '';
  }

  getTotalReturned(): number {
    if (!this.selectedRental) {
      return 0;
    }

    return this.selectedRental.items.reduce(
      (total, item) => total + item.quantityReturned,
      0
    );
  }

  saveReturn(): void {

    if (!this.selectedRental) {
      alert('Silakan pilih data penyewaan terlebih dahulu.');
      return;
    }

    const returnData = {
      rentalId: this.selectedRental.rentalId,
      rentalCode: this.selectedRental.rentalCode,

      rentalDetails: this.selectedRental.items.map(item => ({
        rentalDetailId: item.rentalDetailId,
        quantityReturned: item.quantityReturned,
        damagedQuantity: item.damagedQuantity,
        lostQuantity: item.lostQuantity
      })),

      userId: this.selectedUserId,
      actualReturnDate: this.actualReturnDate,
      notes: this.notes,

      lateFee: this.totalLateFee,
      damageFee: this.totalDamageFee,
      lostItemFee: this.totalLostItemFee,
      totalReturnFee: this.totalReturnFee
    };

    console.log('Data Pengembalian:', returnData);

    alert('Data pengembalian berhasil disiapkan.');
  }

  private getCurrentDateTime(): string {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

}
