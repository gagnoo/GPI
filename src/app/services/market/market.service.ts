import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {Observable} from 'rxjs';
import {HttpResponse} from '../../service-models/api/base.api.model';
import {MarketResponseModel} from '../../service-models/market/market.response.model';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private readonly apiService: ApiService) {
  }

  public getAllMarkets(): Observable<HttpResponse<MarketResponseModel[]>> {
    return this.apiService.get<MarketResponseModel[]>("api/v1/market/list")
  }
}
