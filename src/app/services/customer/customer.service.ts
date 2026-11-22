import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Customer } from '../../shared/types/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http = inject(HttpClient);

  constructor() { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(
      `${environment.apiUrl}/api/customer`
    );
  }

  getCustomerById(id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/api/customer/${id}`
    );
  }

  createCustomer(customer: {
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    identityNumber: string;
  }): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/api/customer`,
      customer
    );
  }

  updateCustomer(id: number, customer: {
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    identityNumber: string;
  }): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/api/customer/${id}`,
      customer
    );
  }
}