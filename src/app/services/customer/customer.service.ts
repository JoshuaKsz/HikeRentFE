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
}
