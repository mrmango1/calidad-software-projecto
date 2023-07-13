import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];
  ngOnInit() {
    this.items = [
      {
        label: 'Mantenimiento de Productos',
        icon: 'pi pi-fw pi-book',
        routerLink: '/product'
      },
     {
       label: 'Mantenimiento de Clientes',
       icon: 'pi pi-fw pi-user',
       routerLink: '/customer',
     }
    ];
  }
}
