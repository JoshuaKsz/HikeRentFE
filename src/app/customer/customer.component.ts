import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { LayoutComponent } from '../layout/layout.component';
import { CustomerService } from '../services/customer/customer.service';
import { Customer } from '../shared/types/customer.model';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, SidebarComponent, DataTableComponent, NavbarComponent, LayoutComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
    @Input() tableClass: string = '';
    customerSvc = inject(CustomerService);
  
    customers: Customer[] = [];

    table = {
      title: "Data Kustomer",
      headers: [
        "customerId",
        "fullName",
        "email",
        "phoneNumber",
        "Adress",
        "identityNumber",
        "createdAt",
        "aksi"
      ],
      data: [] as any[]
    };


    ngOnInit(): void {
      this.loadCustomers();
    }

    loadCustomers(): void {
      this.customerSvc.getCustomers().subscribe({
        next: (response) => {
          console.log(response);
          this.table.data = response.map(customer => ({
            ...customer,
            aksi: '' // Manual input
          }));
        },
        error: (error) => {
          console.error('Error loading customers:', error);
        }
      });
      console.log(this.table);
    }

    isExpanded = true;
    isSidebarCollapsed = false;


    username = 'staff';
    
}
