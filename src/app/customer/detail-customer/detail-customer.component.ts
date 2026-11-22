import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CustomerService } from '../../services/customer/customer.service';
import { Customer } from '../../shared/types/customer.model';

@Component({
  selector: 'app-detail-customer',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './detail-customer.component.html',
  styleUrl: './detail-customer.component.css'
})
export class DetailCustomerComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private customerService = inject(CustomerService);

  customer: Customer | null = null;
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.errorMessage = 'ID customer tidak valid.';
      return;
    }
    this.loadCustomer(id);
  }

  loadCustomer(id: number): void {
    this.isLoading = true;
    this.customerService.getCustomerById(id).subscribe({
      next: (data) => {
        this.customer = data as Customer;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Gagal memuat data customer.';
        this.isLoading = false;
      }
    });
  }

  back(): void {
    this.router.navigate(['/customer']);
  }

  formatDate(value: string | null | undefined): string {
    if (!value) return '-';
    return new Date(value).toLocaleDateString('id-ID', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  }
}
