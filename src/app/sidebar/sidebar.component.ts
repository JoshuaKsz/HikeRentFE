import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isOpen = false;
  isCollapsed = false; 
  @Output() collapsedChange = new EventEmitter<boolean>();

  activeMenu = 'Dashboard';
  menus = [
    { name: 'Dashboard', icon: 'bi-house-door' },
    { name: 'Users', icon: 'bi-people' },
    { name: 'Analytics', icon: 'bi-bar-chart' },
    { name: 'Projects', icon: 'bi-folder' }
  ];

  settings = [
    { name: 'Settings', icon: 'bi-gear' },
    { name: 'Profile', icon: 'bi-person-circle' },
    { name: 'Logout', icon: 'bi-box-arrow-right' }
  ];

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  selectMenu(name: string) {
    this.activeMenu = name;
    this.isOpen = false;
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.collapsedChange.emit(this.isCollapsed);
  }

}
