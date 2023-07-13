import { Component } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from "src/config/types";
import { ProductService } from "src/app/product/product.service";
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ProductComponent {
  visible: boolean = false;
  create: boolean = false;
  products$: Observable<Product[]> = this._productService.products$;
  products: Product[] = [];
  tempProduct: Product = {
    _id: '0',
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    image: '',
  }

  constructor(
    private _productService: ProductService,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService
    ) {
  }

  ngOnInit(): void {
    this._productService.products$.subscribe((products: Product[]) => {
        this.products = products;
      }
    );
  }

  refreshData() {
    this._productService.getProducts().subscribe((response) => {
      this.products = response;
    });
  }

  action() {
    if (this.create) {
      this._productService.createProduct(this.tempProduct)
      .pipe(
        catchError((err: any) => {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al crear el producto, intente nuevamente' });
          return throwError(() => err)
        })
      )
      .subscribe(data => {
        this.refreshData();
        setTimeout(() => {
          this._messageService.add({ severity: 'success', summary: 'Exito', detail: 'Producto creado' });
        }, 500);
      })
    } else {
      this._productService.updateProduct(this.tempProduct).pipe(
        catchError((err: any) => {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al actualizar el producto, intente nuevamente' });
          return throwError(() => err)
        })
      )
      .subscribe(data => {
        this.refreshData();
        setTimeout(() => {
          this._messageService.add({ severity: 'success', summary: 'Exito', detail: 'Producto actualizado' });
        }, 500);
      })
    }
    this.visible = false;
  }

  deleteProduct(product: Product) {
    this._productService.deleteProduct(product._id)
    .pipe(
      catchError((err: any) => {
        this._messageService.add({ severity: 'error', summary: 'Problema', detail: 'Hubo un error al eliminar el producto, intenet nuevamente' });
        return throwError(() => err)
      })
    )
    .subscribe(data => {
      this.refreshData();
      setTimeout(() => {
        this._messageService.add({ severity: 'success', summary: 'Exito', detail: 'Producto eliminado' });
      }, 500);
    })
  }

  confirmDelete(event: Event, product: Product) {
    this._confirmationService.confirm({
        target: event.target!,
        message: 'Esta seguro que desea eliminar el producto del inventario',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.deleteProduct(product);
        }
    });
}

  showDialog(product: Product = {
    _id: '0',
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    image: ''
  }) {
    this.tempProduct = product
    this.visible = true;
    if (product._id === '0') {
      this.create = true
    } else {
      this.create = false
    }
  }
}