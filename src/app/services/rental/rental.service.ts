
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import {
  RentalRequest,
  RentalResponse,
  RentalApiResponse
} from '../../shared/types/rental.model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/api/rental`;

  constructor() { }

  // Mengambil seluruh data rental
  getRentals(): Observable<RentalApiResponse<RentalResponse[]>> {
    return this.http.get<RentalApiResponse<RentalResponse[]>>(
      this.apiUrl
    );
  }

  // Mengambil detail rental berdasarkan ID
  getRentalById(id: number): Observable<RentalApiResponse<RentalResponse>> {
    return this.http.get<RentalApiResponse<RentalResponse>>(
      `${this.apiUrl}/${id}`
    );
  }

  // Menambahkan transaksi rental
  createRental(request: RentalRequest): Observable<RentalApiResponse<RentalResponse>> {
    return this.http.post<RentalApiResponse<RentalResponse>>(
      this.apiUrl,
      request
    );
  }

}
