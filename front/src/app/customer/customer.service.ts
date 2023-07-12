import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { Customer } from "src/config/types";
import { API_URL } from 'src/config/endpoints'


@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  private _customers: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([])

  constructor(private _httpClient: HttpClient) { }

  get customers$(): Observable<Customer[]> {
    return this._customers.asObservable()
  }

  getCustomers(): Observable<Customer[]> {
    return this._httpClient.get<Customer[]>(`${API_URL}/customer`)
      .pipe(
        tap((response) => {
          this._customers.next(response)
        })
        )
  }

  createCustomer(customer: Customer): Observable<Customer> {
    const { _id, ...tempCustomer } = customer
    return this._httpClient.post<Customer>(`${API_URL}/customer`, tempCustomer)
      .pipe(
        tap((response) => {
          const customers = this._customers.getValue()
          customers.push(response)
          this._customers.next(customers)
        })
        )
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this._httpClient.patch<Customer>(`${API_URL}/customer/${customer._id}`, customer)
      .pipe(
        tap((response) => {
          const customers = this._customers.getValue()
          const index = customers.findIndex((p) => p._id === response._id)
          customers[index] = response
          this._customers.next(customers)
        })
        )
  }

  deleteCustomer(id: string): Observable<Customer> {
    return this._httpClient.delete<Customer>(`${API_URL}/customer/${id}`)
      .pipe(
        tap((response) => {
          const customers = this._customers.getValue()
          const index = customers.findIndex((p) => p._id === id)
          customers.splice(index, 1)
          this._customers.next(customers)
        })
        )
  }
}
