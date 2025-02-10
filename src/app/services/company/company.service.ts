import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {Observable} from 'rxjs';
import {HttpResponse} from '../../service-models/api/base.api.model';
import {CompanyResponseModel} from '../../service-models/company/company.response.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private readonly apiService: ApiService) {
  }

  public getAllCompanies(): Observable<HttpResponse<CompanyResponseModel[]>> {
    return this.apiService.get<CompanyResponseModel[]>("api/v1/company/list");
  }
}
