
import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, inject } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  private authSvc = inject(AuthService);
  private router = inject(Router);

  isOpen = false;
  isCollapsed = false;
  isGearMenuOpen = true;

  @Output() collapsedChange = new EventEmitter<boolean>();

  activeMenu = 'Dashboard';

  mainMenu = [
    {
      name: 'Dashboard',
      icon: 'bi-house-door',
      children: []
    },
    {
      name: 'Data Alat',
      icon: 'bi-backpack',
      children: [
        { name: 'Alat Pendakian' },
        { name: 'Kategori & Merek' }
      ]
    },
    {
      name: 'Customer',
      icon: 'bi-people',
      children: []
    },
    {
      name: 'Penyewaan',
      icon: 'bi-calendar-check',
      children: []
    },
    {
      name: 'Pengembalian',
      icon: 'bi-box-seam',
      children: []
    },
    {
      name: 'Pembayaran',
      icon: 'bi-credit-card',
      children: []
    },
    {
      name: 'Aktivitas',
      icon: 'bi-clock-history',
      children: []
    },
    {
      name: 'Logout',
      icon: 'bi-box-arrow-right',
      children: []
    }
  ];

  constructor() {

    // Menyesuaikan menu aktif berdasarkan halaman
    this.updateActiveMenu();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateActiveMenu();
      }
    });

  }

  // Menentukan menu aktif berdasarkan URL
  updateActiveMenu() {

    const currentUrl = this.router.url;

    if (currentUrl.startsWith('/aktivitas')) {
      this.activeMenu = 'Aktivitas';
    }
    else if (currentUrl.startsWith('/dashboard')) {
      this.activeMenu = 'Dashboard';
    }

  }

  // Membuka dan menutup sidebar pada tampilan mobile
  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  // Memilih menu utama
  selectMenu(name: string) {

    if (name === 'Data Alat') {
      this.isGearMenuOpen = !this.isGearMenuOpen;
      return;
    }

    if (name === 'Logout') {
      this.logout();
      return;
    }

    if (name === 'Dashboard') {
      this.router.navigate(['/dashboard']);
    }

    else if (name === 'Aktivitas') {
      this.router.navigate(['/aktivitas']);
    }

    this.activeMenu = name;
    this.isOpen = false;

  }

  // Memilih submenu
  selectSubMenu(name: string) {
    this.activeMenu = name;
    this.isOpen = false;
  }

  // Memperbesar dan memperkecil sidebar
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.collapsedChange.emit(this.isCollapsed);
  }

  // Logout dan kembali ke halaman login
  logout() {

    // this.isOpen = false;
    // this.authSvc.clearToken();
    // this.router.navigate(['/login']);
    console.log('Logging out...');

    console.log('Before:', this.authSvc.getToken());

    this.authSvc.clearToken();

    console.log('After:', this.authSvc.getToken());

    this.isOpen = false;

    console.log(this.authSvc.getToken());
    this.router.navigate(['/login']);
  }

}
