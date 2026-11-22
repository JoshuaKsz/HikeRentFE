import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { GearItemService } from '../services/gear-item/gear-item.service';
import { RentalService } from '../services/rental/rental.service';
import { PaymentService } from '../services/payment/payment.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ DataTableComponent ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent {
    isExpanded = true;

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
    data : [] as any[]
  };

  totalAlat = 0;
  stockTersedia = 0;
  rentalAktif = 0;
  menungguPembayaran = 0;
  disewa = 0;
  rusak = 0;

  gearSvc = inject(GearItemService);
  rentalSvc = inject(RentalService);
  paymentSvc = inject(PaymentService);

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.gearSvc.getGearItems().subscribe({
      next: (gears) => {
        this.totalAlat = gears.length;
        this.stockTersedia = gears.reduce((sum, g) => sum + g.availableStock, 0);
        this.rusak = gears.reduce((sum, g) => sum + g.damagedStock, 0);
        const totalStock = gears.reduce((sum, g) => sum + g.totalStock, 0);
        this.disewa = totalStock - this.stockTersedia - this.rusak;
      }
    });

    this.rentalSvc.getRentals().subscribe({
      next: (res) => {
        const rentals = res.data || [];
        this.rentalAktif = rentals.filter(r => r.status === 'Ongoing').length;
        this.table.data = rentals.slice(0, 5).map(r => ({
          "Kode Rental": r.rentalCode,
          "kustomer": r.customerName,
          "Tgl Sewa": r.plannedStartDate,
          "Tgl kembali": r.plannedReturnDate,
          "status": r.status
        }));
      }
    });

    this.paymentSvc.getPendingPayments().subscribe({
      next: (res: any) => {
        const pendings = res.data || [];
        this.menungguPembayaran = pendings.length;
      },
      error: () => {
        this.menungguPembayaran = 0;
      }
    });
  }
}
