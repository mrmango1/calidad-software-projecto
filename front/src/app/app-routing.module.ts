import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from "./product/product.component";
import { ProductResolver } from './product/product.resolver';
import { CustomerComponent } from './customer/customer.component';
import { CustomerResolver } from './customer/customer.resolver';

const routes: Routes = [
  { path: 'product', component: ProductComponent, resolve: { products: ProductResolver}},
  { path: 'customer', component: CustomerComponent, resolve: { customers: CustomerResolver}},
//  { path: 'notfound', component: NotfoundComponent },
  { path: '', redirectTo: '/product', pathMatch: 'full' },
  { path: '', redirectTo: '/customer', pathMatch: 'full' },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
