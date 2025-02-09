import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpResponse} from '../../service-models/api/base.api.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl: string

  constructor(private readonly http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  public get<T>(path: string): Observable<HttpResponse<T>> {
    return this.http.get<HttpResponse<T>>(`${this.baseUrl}/${path}`);
  }

  public post<T>(path: string, body: string): Observable<HttpResponse<T>> {
    return this.http.post<HttpResponse<T>>(`${this.baseUrl}/${path}`, body);
  }
}
