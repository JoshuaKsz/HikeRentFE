
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  GearItem,
  GearItemRequest
} from '../../shared/types/gear-item.model';

@Injectable({
  providedIn: 'root'
})
export class GearItemService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/gearitem`;

  getGearItems(): Observable<GearItem[]> {
    return this.http.get<GearItem[]>(this.apiUrl);
  }

  getGearItemById(id: number): Observable<GearItem> {
    return this.http.get<GearItem>(`${this.apiUrl}/${id}`);
  }

  createGearItem(request: GearItemRequest): Observable<GearItem> {
    return this.http.post<GearItem>(this.apiUrl, request);
  }

  updateGearItem(id: number, request: GearItemRequest): Observable<GearItem> {
    return this.http.put<GearItem>(`${this.apiUrl}/${id}`, request);
  }

  deleteGearItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/api/category`);
  }

  getBrands(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/api/brand`);
  }
}
