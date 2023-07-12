import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { catchError, Observable, throwError } from 'rxjs'
import { CustomerService } from 'src/app/customer/customer.service'
import { Customer } from "src/config/types";

@Injectable({
  providedIn: 'root',
})
export class CustomerResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(
    private _customerService: CustomerService,
    private _router: Router
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Customer[]> {
      return this._customerService
      .getCustomers()
      .pipe(
        catchError(error => {
          console.error(error)
          const parentUrl = state.url.split('/').slice(0, -1).join('/')
          this._router.navigateByUrl(parentUrl)
          return throwError(error)
        })
      )
  }
}