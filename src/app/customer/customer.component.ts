import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, SidebarComponent, DataTableComponent, NavbarComponent, LayoutComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
    isExpanded = true;
    isSidebarCollapsed = false;

    username = 'staff';
    table = {
      title: "Rental Terbaru",
      headers: [
        "Kode Rental",
        "kustomer",
        "Tgl Sewa",
        "Tgl kembali",
        "status"
      ],
      data : [
        {
          "Kode Rental": "RENT001",
          "kustomer": "Andi Pratama",
          "Tgl Sewa":   "18 Nov 2026",
          "Tgl kembali": "26 Nov 2026",
          "status": "Ongoing"
        },
        {
          "Kode Rental": "RENT001",
          "kustomer": "Andi Pratama",
          "Tgl Sewa":   "18 Nov 2026",
          "Tgl kembali": "26 Nov 2026",
          "status": "Ongoing"
        },
        {
          "Kode Rental": "RENT001",
          "kustomer": "Andi Pratama",
          "Tgl Sewa":   "18 Nov 2026",
          "Tgl kembali": "26 Nov 2026",
          "status": "Completed"
        },
      ]
    }
}
