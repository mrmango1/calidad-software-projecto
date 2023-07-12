import { Component } from '@angular/core';
import { Observable } from 'rxjs';
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
    phone: 0,
    birthday: new Date,
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
      this._customerService.createCustomer(this.tempCustomer).subscribe((response) => {
        this.refreshData();
      });
    } else {
      this._customerService.updateCustomer(this.tempCustomer).subscribe((response) => {
        this.refreshData();
      });
    }
    this.visible = false;
  }

  deleteCustomer(customer: Customer) {
    this._customerService.deleteCustomer(customer._id).subscribe((response) => {
      this.refreshData();
    });
  }

  confirmDelete(event: Event, customer: Customer) {
    this._confirmationService.confirm({
        target: event.target!,
        message: 'Está seguro que desea eliminar el cliente de la base de datos',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this._messageService.add({ severity: 'success', summary: 'Exitosa', detail: 'Cliente Eliminado' });
            this.deleteCustomer(customer);
        },
        reject: () => {
            this._messageService.add({ severity: 'error', summary: 'Problema', detail: 'Hubo un error al eliminar el cliente, intente nuevamente' });
        }
    });
}

  showDialog(customer: Customer = {
    _id: '0',
    name: '',
    address: '',
    mail: '',
    phone: 0,
    birthday: new Date,
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