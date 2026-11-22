
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GearItemService } from '../../services/gear-item/gear-item.service';
import { GearItemRequest } from '../../shared/types/gear-item.model';

@Component({
  selector: 'app-tambah-alat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tambah-alat.component.html',
  styleUrl: './tambah-alat.component.css'
})
export class TambahAlatComponent implements OnInit {
  private gearItemService = inject(GearItemService);
  private router = inject(Router);

  categories: any[] = [];
  brands: any[] = [];

  form: GearItemRequest = {
    categoryId: 0,
    brandId: 0,
    gearName: '',
    description: null,
    dailyPrice: 0,
    replacementPrice: 0,
    totalStock: 0,
    maintenanceStock: 0,
    damagedStock: 0,
    imageUrl: null,
    isActive: true
  };

  isLoading = false;
  isSaving = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadCategories();
    this.loadBrands();
  }

  loadCategories(): void {
    this.gearItemService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: () => this.errorMessage = 'Gagal mengambil data kategori.'
    });
  }

  loadBrands(): void {
    this.gearItemService.getBrands().subscribe({
      next: (data) => this.brands = data,
      error: () => this.errorMessage = 'Gagal mengambil data merek.'
    });
  }

  getCategoryId(item: any): number {
    return item.categoryId ?? item.id;
  }

  getCategoryName(item: any): string {
    return item.categoryName ?? item.name;
  }

  getBrandId(item: any): number {
    return item.brandId ?? item.id;
  }

  getBrandName(item: any): string {
    return item.brandName ?? item.name;
  }

  save(): void {
    this.errorMessage = '';

    if (
      !this.form.categoryId ||
      !this.form.brandId ||
      !this.form.gearName.trim() ||
      this.form.dailyPrice <= 0 ||
      this.form.replacementPrice <= 0 ||
      this.form.totalStock < 0 ||
      this.form.maintenanceStock < 0 ||
      this.form.damagedStock < 0
    ) {
      this.errorMessage = 'Lengkapi data dengan benar sebelum menyimpan.';
      return;
    }

    if (
      this.form.maintenanceStock + this.form.damagedStock >
      this.form.totalStock
    ) {
      this.errorMessage = 'Stok perawatan dan rusak tidak boleh melebihi total stok.';
      return;
    }

    this.isSaving = true;

    const request: GearItemRequest = {
      ...this.form,
      gearName: this.form.gearName.trim(),
      description: this.form.description?.trim() || null,
      imageUrl: this.form.imageUrl?.trim() || null
    };

    this.gearItemService.createGearItem(request).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(['/alatpendakian']);
      },
      error: (error) => {
        this.isSaving = false;
        this.errorMessage =
          error.error?.message || 'Gagal menambahkan alat pendakian.';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/alatpendakian']);
  }
}
