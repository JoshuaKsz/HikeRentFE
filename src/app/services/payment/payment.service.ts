
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  PaymentRequest,
  PaymentResponse,
  PaymentApiResponse
} from '../../shared/types/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/api/payment`;

  getPayments(): Observable<PaymentApiResponse<PaymentResponse[]>> {
    return this.http.get<PaymentApiResponse<PaymentResponse[]>>(
      this.apiUrl
    );
  }

  getPaymentById(id: number): Observable<PaymentApiResponse<PaymentResponse>> {
    return this.http.get<PaymentApiResponse<PaymentResponse>>(
      `${this.apiUrl}/${id}`
    );
  }

  createPayment(
    rentalId: number,
    request: PaymentRequest
  ): Observable<PaymentApiResponse<PaymentResponse>> {
    return this.http.post<PaymentApiResponse<PaymentResponse>>(
      `${this.apiUrl}/${rentalId}`,
      request
    );
  }
}
