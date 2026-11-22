import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ReturnRecordRequest {
  rentalId: number;
  rentalDetailId: number;
  quantityReturned: number;
  damagedQuantity: number;
  lostQuantity: number;
  notes?: string;
  actualReturnDate?: string;
}

export interface ReturnRecordResponse {
  returnRecordId: number;
  userId: number;
  quantityReturned: number;
  damagedQuantity: number;
  lostQuantity: number;
  notes?: string;
  lateFee: number;
  damageFee: number;
  lostItemFee: number;
  actualReturnDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReturnRecordService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/ReturnDetail`;

  getAllReturns(): Observable<ReturnRecordResponse[]> {
    return this.http.get<ReturnRecordResponse[]>(`${this.apiUrl}/`);
  }

  getReturnByRentalDetailId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getReturnById(id: number): Observable<ReturnRecordResponse> {
    return this.http.get<ReturnRecordResponse>(`${this.apiUrl}/return-record/${id}`);
  }

  createReturn(request: ReturnRecordRequest): Observable<ReturnRecordResponse> {
    return this.http.post<ReturnRecordResponse>(`${this.apiUrl}/`, request);
  }
}
