
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

  createGearItem(request: GearItemRequest, imageFile?: File | null): Observable<GearItem> {
    return this.http.post<GearItem>(this.apiUrl, this.toFormData(request, imageFile));
  }

  updateGearItem(id: number, request: GearItemRequest, imageFile?: File | null): Observable<GearItem> {
    return this.http.put<GearItem>(`${this.apiUrl}/${id}`, this.toFormData(request, imageFile));
  }

  private toFormData(request: GearItemRequest, imageFile?: File | null): FormData {
    const fd = new FormData();
    fd.append('categoryId', String(request.categoryId));
    fd.append('brandId', String(request.brandId));
    fd.append('gearName', request.gearName);
    fd.append('description', request.description ?? '');
    fd.append('dailyPrice', String(request.dailyPrice));
    fd.append('replacementPrice', String(request.replacementPrice));
    fd.append('totalStock', String(request.totalStock));
    fd.append('damagedStock', String(request.damagedStock));
    fd.append('imageUrl', request.imageUrl ?? '');
    fd.append('isActive', String(request.isActive));
    if (imageFile) fd.append('imageFile', imageFile);
    return fd;
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
