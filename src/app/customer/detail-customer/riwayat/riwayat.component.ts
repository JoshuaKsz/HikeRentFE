import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../../../services/rental/rental.service';
import { RentalResponse } from '../../../shared/types/rental.model';

@Component({
  selector: 'app-customer-riwayat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './riwayat.component.html',
  styleUrl: './riwayat.component.css'
})
export class RiwayatComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private rentalService = inject(RentalService);

  rentals: RentalResponse[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    const id = Number(this.route.parent?.snapshot.paramMap.get('id'));
    if (!id) {
      this.errorMessage = 'ID customer tidak valid.';
      return;
    }
    this.loadRiwayat(id);
  }

  loadRiwayat(customerId: number): void {
    this.isLoading = true;
    this.rentalService.getRentals().subscribe({
      next: (res) => {
        const all = res.data ?? [];
        this.rentals = all.filter(r => r.customerId === customerId);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Gagal memuat riwayat penyewaan.';
        this.isLoading = false;
      }
    });
  }

  getStatusLabel(status: string): string {
    switch (status?.toLowerCase()) {
      case 'ongoing': return 'Berlangsung';
      case 'returned': return 'Dikembalikan';
      case 'completed': return 'Selesai';
      default: return status || '-';
    }
  }

  getPaymentLabel(status: string): string {
    switch (status?.toLowerCase()) {
      case 'paid': return 'Lunas';
      case 'unpaid': return 'Belum Lunas';
      default: return status || '-';
    }
  }
}
