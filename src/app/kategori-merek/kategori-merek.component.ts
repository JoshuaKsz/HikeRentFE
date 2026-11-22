
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category/category.service';
import { BrandService } from '../services/brand/brand.service';
import { Category, CategoryRequest } from '../shared/types/category.model';
import { Brand, BrandRequest } from '../shared/types/brand.model';

@Component({
  selector: 'app-kategori-merek',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kategori-merek.component.html',
  styleUrl: './kategori-merek.component.css'
})
export class KategoriMerekComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private brandService = inject(BrandService);

  categories: Category[] = [];
  brands: Brand[] = [];

  isLoadingCategories = false;
  isLoadingBrands = false;
  errorMessage = '';
  successMessage = '';

  showCategoryForm = false;
  showBrandForm = false;

  editingCategoryId: number | null = null;
  editingBrandId: number | null = null;

  categoryForm: CategoryRequest = {
    categoryName: '',
    description: null
  };

  brandForm: BrandRequest = {
    brandName: '',
    description: null
  };

  ngOnInit(): void {
    this.loadCategories();
    this.loadBrands();
  }

  loadCategories(): void {
    this.isLoadingCategories = true;

    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response ?? [];
        this.isLoadingCategories = false;
      },
      error: (error) => {
        this.categories = [];
        this.errorMessage =
          error.error?.message || 'Gagal mengambil data kategori.';
        this.isLoadingCategories = false;
      }
    });
  }

  loadBrands(): void {
    this.isLoadingBrands = true;

    this.brandService.getBrands().subscribe({
      next: (response) => {
        this.brands = response ?? [];
        this.isLoadingBrands = false;
      },
      error: (error) => {
        this.brands = [];
        this.errorMessage =
          error.error?.message || 'Gagal mengambil data merek.';
        this.isLoadingBrands = false;
      }
    });
  }

  openCategoryForm(category?: Category): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.showCategoryForm = true;

    if (category) {
      this.editingCategoryId = category.categoryId;
      this.categoryForm = {
        categoryName: category.categoryName,
        description: category.description
      };
    } else {
      this.editingCategoryId = null;
      this.categoryForm = {
        categoryName: '',
        description: null
      };
    }
  }

  closeCategoryForm(): void {
    this.showCategoryForm = false;
    this.editingCategoryId = null;
    this.categoryForm = {
      categoryName: '',
      description: null
    };
  }

  saveCategory(): void {
    const categoryName = this.categoryForm.categoryName.trim();

    if (!categoryName) {
      this.errorMessage = 'Nama kategori wajib diisi.';
      return;
    }

    const request: CategoryRequest = {
      categoryName,
      description: this.categoryForm.description?.trim() || null
    };

    const request$ = this.editingCategoryId !== null
      ? this.categoryService.updateCategory(this.editingCategoryId, request)
      : this.categoryService.createCategory(request);

    request$.subscribe({
      next: () => {
        this.successMessage = this.editingCategoryId !== null
          ? 'Kategori berhasil diperbarui.'
          : 'Kategori berhasil ditambahkan.';
        this.errorMessage = '';
        this.closeCategoryForm();
        this.loadCategories();
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message || 'Gagal menyimpan data kategori.';
      }
    });
  }

  deleteCategory(category: Category): void {
    const confirmation = confirm(
      `Apakah Anda yakin ingin menghapus kategori "${category.categoryName}"?`
    );

    if (!confirmation) {
      return;
    }

    this.categoryService.deleteCategory(category.categoryId).subscribe({
      next: () => {
        this.successMessage = 'Kategori berhasil dihapus.';
        this.errorMessage = '';
        this.loadCategories();
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message || 'Gagal menghapus kategori.';
      }
    });
  }

  openBrandForm(brand?: Brand): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.showBrandForm = true;

    if (brand) {
      this.editingBrandId = brand.brandId;
      this.brandForm = {
        brandName: brand.brandName,
        description: brand.description
      };
    } else {
      this.editingBrandId = null;
      this.brandForm = {
        brandName: '',
        description: null
      };
    }
  }

  closeBrandForm(): void {
    this.showBrandForm = false;
    this.editingBrandId = null;
    this.brandForm = {
      brandName: '',
      description: null
    };
  }

  saveBrand(): void {
    const brandName = this.brandForm.brandName.trim();

    if (!brandName) {
      this.errorMessage = 'Nama merek wajib diisi.';
      return;
    }

    const request: BrandRequest = {
      brandName,
      description: this.brandForm.description?.trim() || null
    };

    const request$ = this.editingBrandId !== null
      ? this.brandService.updateBrand(this.editingBrandId, request)
      : this.brandService.createBrand(request);

    request$.subscribe({
      next: () => {
        this.successMessage = this.editingBrandId !== null
          ? 'Merek berhasil diperbarui.'
          : 'Merek berhasil ditambahkan.';
        this.errorMessage = '';
        this.closeBrandForm();
        this.loadBrands();
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message || 'Gagal menyimpan data merek.';
      }
    });
  }

  deleteBrand(brand: Brand): void {
    const confirmation = confirm(
      `Apakah Anda yakin ingin menghapus merek "${brand.brandName}"?`
    );

    if (!confirmation) {
      return;
    }

    this.brandService.deleteBrand(brand.brandId).subscribe({
      next: () => {
        this.successMessage = 'Merek berhasil dihapus.';
        this.errorMessage = '';
        this.loadBrands();
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message || 'Gagal menghapus merek.';
      }
    });
  }
}
