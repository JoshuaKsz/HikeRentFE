
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
    else if (currentUrl.startsWith('/pengembalian')) {
      this.activeMenu = 'Pengembalian';
    }
    else if (currentUrl.startsWith('/rental')) {
      this.activeMenu = 'Penyewaan';
    }
    else if (currentUrl.startsWith('/kategori-merek')) {
      this.activeMenu = 'Kategori & Merek';
    }
    else if (currentUrl.startsWith('/customer')) {
    this.activeMenu = 'Customer';
    
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

    else if (name === 'Penyewaan') {
      this.router.navigate(['/rental']);
    }

    else if (name === 'Customer') {
      this.router.navigate(['/customer']);
    }

    else if (name === 'Pengembalian') {
      this.router.navigate(['/pengembalian']);
    }

    this.activeMenu = name;
    this.isOpen = false;

  }

  // Memilih submenu
  selectSubMenu(name: string) {

    if (name === 'Alat Pendakian') {
      this.router.navigate(['/alatpendakian']);
    } else if (name === 'Kategori & Merek') {
      this.router.navigate(['/kategori-merek']);
    }

    this.activeMenu = name;
    this.isOpen = false;
  }

  // Memperbesar dan memperkecil sidebar
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.collapsedChange.emit(this.isCollapsed);
  }

  logout() {
    this.authSvc.clearToken();

    this.isOpen = false;

    this.router.navigate(['/login']);
  }

}
