
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alat-pendakian',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './alat-pendakian.component.html',
  styleUrl: './alat-pendakian.component.css'
})

export class AlatPendakianComponent {

  searchText = '';

  // Data alat pendakian
  gearList = [
    {
      id: 1,
      image: 'assets/tenda.png',
      name: 'Tenda Dome',
      category: 'Tenda',
      brand: 'Eiger',
      price: 'IDR50,000',
      total: 10,
      available: 8,
      status: 'Aktif'
    },
    {
      id: 2,
      image: 'assets/carrier.png',
      name: 'Carrier 60L',
      category: 'Carrier',
      brand: 'Consina',
      price: 'IDR35,000',
      total: 8,
      available: 7,
      status: 'Aktif'
    },
    {
      id: 3,
      image: 'assets/sleeping-bag.png',
      name: 'Sleeping Bag',
      category: 'Tidur',
      brand: 'Eiger',
      price: 'IDR25,000',
      total: 6,
      available: 5,
      status: 'Aktif'
    }
  ];

  // Filter data berdasarkan pencarian
  get filteredGear() {
    const keyword = this.searchText.toLowerCase().trim();

    return this.gearList.filter(gear =>
      gear.name.toLowerCase().includes(keyword)
    );
  }

  // Tambah alat
  addGear() {
    const name = prompt('Masukkan nama alat:');

    if (!name || !name.trim()) {
      return;
    }

    const newGear = {
      id: this.gearList.length > 0
        ? Math.max(...this.gearList.map(gear => gear.id)) + 1
        : 1,
      image: 'assets/tenda.png',
      name: name.trim(),
      category: '-',
      brand: '-',
      price: 'IDR0',
      total: 0,
      available: 0,
      status: 'Aktif'
    };

    this.gearList.push(newGear);
  }

  // Edit alat
  editGear(gear: any) {
    const newName = prompt('Ubah nama alat:', gear.name);

    if (newName && newName.trim()) {
      gear.name = newName.trim();
    }
  }

  // Hapus alat
  deleteGear(id: number) {
    const confirmation = confirm('Apakah Anda yakin ingin menghapus alat ini?');

    if (confirmation) {
      this.gearList = this.gearList.filter(gear => gear.id !== id);
    }
  }

}
