import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, DataTableComponent, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent {
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
