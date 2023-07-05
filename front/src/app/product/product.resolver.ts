import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { catchError, Observable, throwError } from 'rxjs'
import { ProductService } from 'src/app/product/product.service'
import { Product } from "src/config/types";

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(
    private _productService: ProductService,
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
  ): Observable<Product[]> {
      return this._productService
      .getProducts()
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
