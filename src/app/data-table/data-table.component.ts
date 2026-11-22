
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent {
  @Input() headers: string[] = [];
  @Input() data: any[] = [];
  @Input() title: string = '';

  @Output() edit = new EventEmitter<any>();
  @Output() view = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  isDateColumn(header: string): boolean {
    const h = header.toLowerCase();
    const isDate = h.includes('date') || h.includes('tanggal') || h.includes('createdat') || h.includes('tgl');
    return isDate && !this.isDateTimeColumn(header);
  }

  isDateTimeColumn(header: string): boolean {
    const h = header.toLowerCase();
    return h.includes('waktu') || h.includes('time') || h.includes('jam');
  }

  isStatusColumn(header: string): boolean {
    return header.toLowerCase() === 'status';
  }

  isActionColumn(header: string): boolean {
    return header.toLowerCase() === 'aksi';
  }
}
