import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { Product } from "src/config/types";
import { API_URL } from 'src/config/endpoints'


@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([])

  constructor(private _httpClient: HttpClient) { }

  get products$(): Observable<Product[]> {
    return this._products.asObservable()
  }

  getProducts(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(`${API_URL}/product`)
      .pipe(
        tap((response) => {
          this._products.next(response)
        })
        )
  }

  createProduct(product: Product): Observable<Product> {
    const { _id, ...tempProduct } = product
    return this._httpClient.post<Product>(`${API_URL}/product`, tempProduct)
      .pipe(
        tap((response) => {
          const products = this._products.getValue()
          products.push(response)
          this._products.next(products)
        })
        )
  }

  updateProduct(product: Product): Observable<Product> {
    return this._httpClient.patch<Product>(`${API_URL}/product/${product._id}`, product)
      .pipe(
        tap((response) => {
          const products = this._products.getValue()
          const index = products.findIndex((p) => p._id === response._id)
          products[index] = response
          this._products.next(products)
        })
        )
  }

  deleteProduct(id: string): Observable<Product> {
    return this._httpClient.delete<Product>(`${API_URL}/product/${id}`)
      .pipe(
        tap((response) => {
          const products = this._products.getValue()
          const index = products.findIndex((p) => p._id === id)
          products.splice(index, 1)
          this._products.next(products)
        })
        )
  }
}
