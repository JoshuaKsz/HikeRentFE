import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ActivityLogResponse {
  activityLogId: number;
  userId: number;
  staffName: string;
  activity: string;
  activityDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/ActivityLog`;

  getActivities(): Observable<ActivityLogResponse[]> {
    return this.http.get<ActivityLogResponse[]>(this.apiUrl);
  }

  getActivityById(id: number): Observable<ActivityLogResponse> {
    return this.http.get<ActivityLogResponse>(`${this.apiUrl}/${id}`);
  }
}
