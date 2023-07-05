import {Component} from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from "src/config/types";
import {ProductService} from "src/app/product/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  visible: boolean = false;
  create: boolean = false;
  products$: Observable<Product[]> = this._productService.products$;
  products: Product[] = [];
  tempProduct: Product = {
    id: '0',
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    thumbnail: '',
    image: '',
  }

  constructor(private _productService: ProductService) {
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
      this._productService.createProduct(this.tempProduct).subscribe((response) => {
        this.refreshData();
      });
    } else {
      this._productService.updateProduct(this.tempProduct).subscribe((response) => {
        this.refreshData();
      });
    }
    this.visible = false;
  }

  deleteProduct(product: Product) {
    this._productService.deleteProduct(product.id).subscribe((response) => {
      this.refreshData();
    });
  }

  showDialog(product: Product = {
    id: '0',
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    thumbnail: '',
    image: ''
  }) {
    this.tempProduct = product
    this.visible = true;
    if (product.id === '0') {
      this.create = true
    } else {
      this.create = false
    }
  }
}