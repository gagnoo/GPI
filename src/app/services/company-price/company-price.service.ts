import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {CompanyPriceResponseModel} from '../../service-models/company-price/company-price.response.model';
import {HttpResponse} from '../../service-models/api/base.api.model';
import {Observable} from 'rxjs';
import {UpdateCompanyPriceModel} from '../../service-models/company-price/update.company-price.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyPriceService {
  constructor(private readonly apiService: ApiService) {
  }

  public getAllCompanyPrices(): Observable<HttpResponse<CompanyPriceResponseModel[]>> {
    return this.apiService.get<CompanyPriceResponseModel[]>("api/v1/companyPrice/list");
  }

  public updateAmount(request: UpdateCompanyPriceModel): Observable<HttpResponse<boolean>> {
    return this.apiService.post<boolean>("api/v1/companyPrice/update", JSON.stringify(request));
  }
}
