
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DataTableComponent } from '../data-table/data-table.component';

@Component({
  selector: 'app-aktivitas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
    DataTableComponent
  ],
  templateUrl: './aktivitas.component.html',
  styleUrl: './aktivitas.component.css'
})
export class AktivitasComponent {

  isSidebarCollapsed = false;

  searchText = '';

  // Data tabel aktivitas
  table = {
    title: 'Riwayat Aktivitas',
    headers: [
      'ID',
      'Nama Staff',
      'Aktivitas',
      'Tanggal & Waktu'
    ],
    data: [
      {
        'ID': 1,
        'Nama Staff': 'Andi Pratama',
        'Aktivitas': 'Login ke sistem',
        'Tanggal & Waktu': '19 Nov 2026, 08:15'
      },
      {
        'ID': 2,
        'Nama Staff': 'Budi Santoso',
        'Aktivitas': 'Menambahkan alat baru',
        'Tanggal & Waktu': '19 Nov 2026, 08:30'
      },
      {
        'ID': 3,
        'Nama Staff': 'Siti Rahma',
        'Aktivitas': 'Membuat penyewaan RENT001',
        'Tanggal & Waktu': '19 Nov 2026, 09:10'
      },
      {
        'ID': 4,
        'Nama Staff': 'Dimas Putra',
        'Aktivitas': 'Mencatat pengembalian RENT001',
        'Tanggal & Waktu': '19 Nov 2026, 09:45'
      }
    ]
  };

  // Filter data berdasarkan pencarian
  get filteredActivities() {
    const keyword = this.searchText.toLowerCase().trim();

    return this.table.data.filter(activity =>
      Object.values(activity).some(value =>
        value.toString().toLowerCase().includes(keyword)
      )
    );
  }

}
