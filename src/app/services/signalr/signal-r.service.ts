import {Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel} from '@microsoft/signalr';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {CompanyPriceResponseModel} from '../../service-models/company-price/company-price.response.model';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: HubConnection;
  private companyPrices: BehaviorSubject<CompanyPriceResponseModel[]> = new BehaviorSubject<CompanyPriceResponseModel[]>([]);
  public companyPrices$: Observable<CompanyPriceResponseModel[]> = this.companyPrices.asObservable();

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(environment.signalRUrl)
      .configureLogging(LogLevel.Error)
      .withAutomaticReconnect()
      .build();
  }

  public getCompanyPricesData = () => {
    this.hubConnection.on('UpdateCompanyPrice', (data) => {
      this.companyPrices.next(data);
    });
  }

  public startConnection = (): Promise<void> | undefined => {
    if (this.isConnected())
      return;

    return this.hubConnection.start()
      .then(() => {
        console.log('Connected')
        this.getCompanyPricesData()
      })
      .catch((error: Error) => {
        console.log('connection failed');
        console.error(error);
      })
  }

  public stopConnection = (): Promise<void> | undefined => {
    if (this.isDisconnected())
      return;

    return this.hubConnection.stop()
      .then(() => console.log('Disconnected'))
      .catch((error: Error) => {
        console.log('connection failed');
        console.error(error);
      })
  }

  public isConnected = (): boolean => {
    return this.hubConnection.state === HubConnectionState.Connected;
  }

  public isDisconnected = (): boolean => {
    return this.hubConnection.state === HubConnectionState.Disconnected;
  }
}
