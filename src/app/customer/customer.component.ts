
import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
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
  imports: [ CommonModule, RouterLink, SidebarComponent, DataTableComponent, NavbarComponent,LayoutComponent ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  @Input() tableClass: string = '';

  customerSvc = inject(CustomerService);
  router = inject(Router);

  customers: Customer[] = [];

  table = {
    title: 'Data Kustomer',
    headers: [
      'customerId',
      'fullName',
      'email',
      'phoneNumber',
      'Adress',
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

  isExpanded = true;
  username = 'staff';
}
