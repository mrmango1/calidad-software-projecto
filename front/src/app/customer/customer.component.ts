import { Component } from '@angular/core';
import { Observable, catchError, pipe, throwError } from 'rxjs';
import { Customer } from "src/config/types";
import { CustomerService } from "src/app/customer/customer.service";
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CustomerComponent {
  visible: boolean = false;
  create: boolean = false;
  customers$: Observable<Customer[]> = this._customerService.customers$;
  customers: Customer[] = [];
  tempCustomer: Customer = {
    _id: '0',
    name: '',
    address: '',
    mail: '',
    phone: '',
    birthdate: '',
  }

  constructor(
    private _customerService: CustomerService,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService
    ) {
  }

  ngOnInit(): void {
    this._customerService.customers$.subscribe((customers: Customer[]) => {
        this.customers = customers;
      }
    );
  }

  refreshData() {
    this._customerService.getCustomers().subscribe((response) => {
      this.customers = response;
    });
  }

  action() {
    if (this.create) {
      this._customerService.createCustomer(this.tempCustomer)
      .pipe(
        catchError((err: any) => {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al crear el cliente, intente nuevamente' });
          return throwError(() => err)
        })
      )
      .subscribe(data => {
        this.refreshData();
        setTimeout(() => {
          this._messageService.add({ severity: 'success', summary: 'Exito', detail: 'Cliente creado' });
        }, 500);
      })
    } else {
      this._customerService.updateCustomer(this.tempCustomer)
      .pipe(
        catchError((err: any) => {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al actualizar el cliente, intente nuevamente' });
          return throwError(() => err)
        })
      )
      .subscribe(data => {
        this.refreshData();
        setTimeout(() => {
          this._messageService.add({ severity: 'success', summary: 'Exito', detail: 'Cliente actualizado' });
        }, 500);
      })
    }
    this.visible = false;
  }

  deleteCustomer(customer: Customer) {
    this._customerService.deleteCustomer(customer._id)
    .pipe(
      catchError((err: any) => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al eliminar el cliente, intente nuevamente' });
        return throwError(() => err)
      })
    )
    .subscribe(data => {
      this.refreshData();
      setTimeout(() => {
        this._messageService.add({ severity: 'success', summary: 'Exito', detail: 'Cliente eliminado' });
      }, 500);
    })
  }

  confirmDelete(event: Event, customer: Customer) {
    this._confirmationService.confirm({
        target: event.target!,
        message: 'Está seguro que desea eliminar el cliente de la base de datos',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.deleteCustomer(customer);
        }
    });
}

  showDialog(customer: Customer = {
    _id: '0',
    name: '',
    address: '',
    mail: '',
    phone: '',
    birthdate: '',
  }) {
    this.tempCustomer = customer
    this.visible = true;
    if (customer._id === '0') {
      this.create = true
    } else {
      this.create = false
    }
  }
}