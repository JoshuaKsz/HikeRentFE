
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-aktivitas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent
  ],
  templateUrl: './aktivitas.component.html',
  styleUrl: './aktivitas.component.css'
})
export class AktivitasComponent {

  isSidebarCollapsed = false;

  searchText = '';

  // Data dummy aktivitas staff
  activities = [
    {
      id: 1,
      namaStaff: 'Andi Pratama',
      aktivitas: 'Login ke sistem',
      tanggalWaktu: '19 Nov 2026, 08:15'
    },
    {
      id: 2,
      namaStaff: 'Budi Santoso',
      aktivitas: 'Menambahkan alat baru',
      tanggalWaktu: '19 Nov 2026, 08:30'
    },
    {
      id: 3,
      namaStaff: 'Siti Rahma',
      aktivitas: 'Membuat penyewaan RENT001',
      tanggalWaktu: '19 Nov 2026, 09:10'
    },
    {
      id: 4,
      namaStaff: 'Dimas Putra',
      aktivitas: 'Mencatat pengembalian RENT001',
      tanggalWaktu: '19 Nov 2026, 09:45'
    },
    {
      id: 5,
      namaStaff: 'Andi Pratama',
      aktivitas: 'Mencatat pembayaran RENT001',
      tanggalWaktu: '19 Nov 2026, 10:00'
    },
    {
      id: 6,
      namaStaff: 'Siti Rahma',
      aktivitas: 'Memperbarui data customer',
      tanggalWaktu: '19 Nov 2026, 10:30'
    },
    {
      id: 7,
      namaStaff: 'Budi Santoso',
      aktivitas: 'Memperbarui data alat',
      tanggalWaktu: '19 Nov 2026, 11:00'
    },
    {
      id: 8,
      namaStaff: 'Dimas Putra',
      aktivitas: 'Logout dari sistem',
      tanggalWaktu: '19 Nov 2026, 11:30'
    }
  ];

  // Filter data berdasarkan pencarian
  get filteredActivities() {
    const keyword = this.searchText.toLowerCase().trim();

    return this.activities.filter(activity =>
      activity.id.toString().includes(keyword) ||
      activity.namaStaff.toLowerCase().includes(keyword) ||
      activity.aktivitas.toLowerCase().includes(keyword) ||
      activity.tanggalWaktu.toLowerCase().includes(keyword)
    );
  }

}
