import { Component } from '@angular/core';
import { DtoInvoiceList } from '../../_dto/dto-invoice-list';
import { SwalMessages } from '../../../../shared/swal-messages';
import { InvoiceService } from '../../_service/invoice.service';
import { SharedModule } from '../../../../shared/shared-module';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [SharedModule, NgxPaginationModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {

  invoices: DtoInvoiceList[] = []; // Invoice list

  current_date = new Date(); // hora y fecha actual
  loading = false; // loading request 
  swal: SwalMessages = new SwalMessages(); // swal messages
  p: number = 1; //pagination
  itemsPerPage: number = 8;

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
  ){}

  ngOnInit(){
    this.getInvoices();
  }

  getInvoices(){
    this.loading = true;
    this.invoiceService.getInvoices().subscribe({
      next: (v) => {
        this.invoices = v;
        this.loading = false;
        this.current_date = new Date();
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
      }
    });
  }

  showInvoice(id: number){
    this.router.navigate(['invoice/' + id]);
  }
}
