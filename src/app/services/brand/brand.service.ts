
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Brand, BrandRequest } from '../../shared/types/brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/brand`;

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl);
  }

  getBrandById(id: number): Observable<Brand> {
    return this.http.get<Brand>(`${this.apiUrl}/${id}`);
  }

  createBrand(request: BrandRequest): Observable<Brand> {
    return this.http.post<Brand>(this.apiUrl, request);
  }

  updateBrand(id: number, request: BrandRequest): Observable<Brand> {
    return this.http.put<Brand>(`${this.apiUrl}/${id}`, request);
  }

  deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
