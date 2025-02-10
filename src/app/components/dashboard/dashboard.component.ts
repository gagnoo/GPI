import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CompanyPriceService} from '../../services/company-price/company-price.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {CompanyPriceResponseModel} from '../../service-models/company-price/company-price.response.model';
import {SignalRService} from '../../services/signalr/signal-r.service';
import {HttpResponse} from '../../service-models/api/base.api.model';
import {UpdateCompanyPriceModel} from '../../service-models/company-price/update.company-price.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatTableModule,
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public readonly displayedColumns: string[] = ['id', 'companyName', 'marketName', 'price']

  public dataSource: MatTableDataSource<CompanyPriceResponseModel> = new MatTableDataSource<CompanyPriceResponseModel>();
  public amount: number = 0;
  public selectedIndex: number = -1;
  public currentRow?: CompanyPriceResponseModel | null;

  constructor(private readonly companyPriceService: CompanyPriceService,
              private readonly signalR: SignalRService) {
  }

  public ngOnInit(): void {
    this.signalR.startConnection();
    this.signalR.companyPrices$.subscribe({
      next: (response: CompanyPriceResponseModel[]) => {
        this.dataSource = new MatTableDataSource<CompanyPriceResponseModel>(response);
      },
      error: error => {
        console.log(error);
      }
    })
  }

  public ngAfterViewInit(): void {
    this.fetchCompanyPrices()
  }

  public onRowClick(row: CompanyPriceResponseModel, index: number): void {
    if (this.selectedIndex === index) {
      this.selectedIndex = -1;
      this.currentRow = null;
    } else {
      this.selectedIndex = index;
      this.currentRow = row;
    }
  }

  public updateAmount(): void {
    if (this.currentRow === null || this.currentRow === undefined) {
      alert('Please specify the row');
      return;
    }

    if (this.amount <= 0)
      return;

    const request: UpdateCompanyPriceModel = {
      price: this.amount,
      id: this.currentRow.id,
      companyId: this.currentRow.companyId,
      marketId: this.currentRow.marketId
    }

    this.companyPriceService.updateAmount(request).subscribe({
      next: (result: HttpResponse<boolean>) => {
        console.log(result);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  public fetchCompanyPrices() {
    this.companyPriceService
      .getAllCompanyPrices()
      .subscribe({
        next: response => {
          console.log(response);
          if (response.success) {
            this.dataSource.data = response.data;
          }
        },
        error: err => {
          console.log(err);
        }
      })
  }
}
