
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GearItemService } from '../services/gear-item/gear-item.service';
import { GearItem } from '../shared/types/gear-item.model';

@Component({
  selector: 'app-alat-pendakian',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alat-pendakian.component.html',
  styleUrl: './alat-pendakian.component.css'
})
export class AlatPendakianComponent implements OnInit {
  private gearItemService = inject(GearItemService);
  private router = inject(Router);

  searchText = '';
  gearList: GearItem[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.loadGearItems();
  }

  loadGearItems(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.gearItemService.getGearItems().subscribe({
      next: (response) => {
        this.gearList = response ?? [];
        this.isLoading = false;
      },
      error: (error) => {
        this.gearList = [];
        this.errorMessage =
          error.error?.message ||
          'Gagal mengambil data alat pendakian.';
        this.isLoading = false;
      }
    });
  }

  get filteredGear(): GearItem[] {
    const keyword = this.searchText.trim().toLowerCase();

    if (!keyword) {
      return this.gearList;
    }

    return this.gearList.filter((gear) =>
      (gear.gearName ?? '').toLowerCase().includes(keyword) ||
      (gear.categoryName ?? '').toLowerCase().includes(keyword) ||
      (gear.brandName ?? '').toLowerCase().includes(keyword)
    );
  }

  addGear(): void {
    this.router.navigate(['/alatpendakian/tambah']);
  }

  editGear(gear: GearItem): void {
    this.router.navigate(['/alatpendakian/edit', gear.gearItemId]);
  }

  deleteGear(id: number): void {
    const confirmation = confirm(
      'Apakah Anda yakin ingin menghapus alat ini?'
    );

    if (!confirmation) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.gearItemService.deleteGearItem(id).subscribe({
      next: () => {
        this.successMessage = 'Data alat berhasil dihapus.';
        this.loadGearItems();
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message ||
          'Gagal menghapus data alat pendakian.';
      }
    });
  }

  formatRupiah(value: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(value ?? 0);
  }
}
