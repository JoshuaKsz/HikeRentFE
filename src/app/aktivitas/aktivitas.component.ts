
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { ActivityLogService, ActivityLogResponse } from '../services/activity-log/activity-log.service';

@Component({
  selector: 'app-aktivitas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DataTableComponent
  ],
  templateUrl: './aktivitas.component.html',
  styleUrl: './aktivitas.component.css'
})
export class AktivitasComponent implements OnInit {

  searchText = '';

  activitySvc = inject(ActivityLogService);

  table = {
    title: 'Riwayat Aktivitas',
    headers: [
      'ID',
      'Nama Staff',
      'Aktivitas',
      'Tanggal & Waktu'
    ],
    data: [] as any[]
  };

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities(): void {
    this.activitySvc.getActivities().subscribe({
      next: (activities: ActivityLogResponse[]) => {
        this.table.data = activities.map(a => ({
          'ID': a.activityLogId,
          'Nama Staff': a.staffName,
          'Aktivitas': a.activity,
          'Tanggal & Waktu': new Date(a.activityDate).toLocaleString('id-ID', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
          })
        }));
      },
      error: (err) => console.error('Error loading activities:', err)
    });
  }

  get filteredActivities() {
    const keyword = this.searchText.toLowerCase().trim();
    if (!keyword) return this.table.data;

    return this.table.data.filter(activity =>
      String(activity['Nama Staff'] ?? '').toLowerCase().includes(keyword)
    );
  }

}
