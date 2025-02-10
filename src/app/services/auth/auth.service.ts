import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {Observable} from 'rxjs';
import {HttpResponse} from '../../service-models/api/base.api.model';
import {AuthRequestModel} from '../../service-models/auth/auth.request.model';
import {Utilities} from '../../utilities/utilities';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly apiService: ApiService) {
  }

  public auth(request: AuthRequestModel): Observable<HttpResponse<string>> {
    if (Utilities.IsNullOrEmptyStr(request.userName))
      throw 'Invalid username or password';

    if (Utilities.IsNullOrEmptyStr(request.password))
      throw 'Invalid username or password';

    return this.apiService.post<string>("api/v1/auth/authorize", JSON.stringify(request))
  }
}
