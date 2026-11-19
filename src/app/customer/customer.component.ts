import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
    @Input() tableClass: string = '';
    isExpanded = true;
    isSidebarCollapsed = false;

    username = 'staff';
    table = {
      title: "Data Kustomer",
      headers: [
        "ID",
        "Nama",
        "Email",
        "No. Telepon",
        "Identitas",
        "aksi"
      ],
      data: [
        {
          "ID": "CUST001",
          "Nama": "Andi Pratama",
          "Email": "andi.pratama@example.com",
          "No. Telepon": "081234567890",
          "Identitas": "3174011205900001",
          "aksi": ''
        },
        {
          "ID": "CUST002",
          "Nama": "Siti Rahmawati",
          "Email": "siti.rahmawati@example.com",
          "No. Telepon": "081298765432",
          "Identitas": "3174024508920002",
          "aksi": ''
        },
        {
          "ID": "CUST003",
          "Nama": "Budi Santoso",
          "Email": "budi.santoso@example.com",
          "No. Telepon": "082112345678",
          "Identitas": "3174031507880003",
          "aksi": ''
        },
        {
          "ID": "CUST004",
          "Nama": "Dewi Anggraini",
          "Email": "dewi.anggraini@example.com",
          "No. Telepon": "085712345678",
          "Identitas": "3174042209950004",
          "aksi": ''
        },
        {
          "ID": "CUST005",
          "Nama": "Rizky Firmansyah",
          "Email": "rizky.firmansyah@example.com",
          "No. Telepon": "081356789012",
          "Identitas": "3174051009910005",
          "aksi": ''
        },
        {
          "ID": "CUST006",
          "Nama": "Putri Maharani",
          "Email": "putri.maharani@example.com",
          "No. Telepon": "082298765432",
          "Identitas": "3174061808960006",
          "aksi": ''
        },
        {
          "ID": "CUST007",
          "Nama": "Fajar Ramadhan",
          "Email": "fajar.ramadhan@example.com",
          "No. Telepon": "087812345678",
          "Identitas": "3174072509930007",
          "aksi": ''
        },
        {
          "ID": "CUST008",
          "Nama": "Nadia Safitri",
          "Email": "nadia.safitri@example.com",
          "No. Telepon": "081987654321",
          "Identitas": "3174081408970008",
          "aksi": ''
        }
      ]
    };
}
