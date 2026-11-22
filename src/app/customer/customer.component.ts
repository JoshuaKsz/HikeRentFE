
import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { LayoutComponent } from '../layout/layout.component';
import { CustomerService } from '../services/customer/customer.service';
import { Customer } from '../shared/types/customer.model';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterLink, DataTableComponent ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  @Input() tableClass: string = '';

  customerSvc = inject(CustomerService);
  router = inject(Router);

  customers: Customer[] = [];
  searchText = '';

  table = {
    title: 'Data Kustomer',
    headers: [
      'customerId',
      'fullName',
      'email',
      'phoneNumber',
      'Alamat',
      'identityNumber',
      'createdAt',
      'aksi'
    ],
    data: [] as any[]
  };

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerSvc.getCustomers().subscribe({
      next: (response) => {
        this.customers = response;

        this.table.data = response.map(customer => ({
          ...customer,
          Alamat: customer.address ?? '-',
          aksi: ''
        }));
      },
      error: (error) => {
        console.error('Error loading customers:', error);
      }
    });
  }

  editCustomer(customer: Customer): void {
    this.router.navigate(['/customer/edit', customer.customerId]);
  }

  viewCustomer(customer: any): void {
    this.router.navigate(['/customer', customer.customerId]);
  }

  get filteredData() {
    const keyword = this.searchText.toLowerCase().trim();
    if (!keyword) return this.table.data;
    return this.table.data.filter(row =>
      String(row.fullName ?? '').toLowerCase().includes(keyword)
    );
  }

  isExpanded = true;
  username = 'staff';
}
