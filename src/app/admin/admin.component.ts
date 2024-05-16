import { Component } from '@angular/core';

import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { OrdersComponent } from './components/orders/orders.component';
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/products/products.component';

@Component({
  selector: 'ts-admin',
  standalone: true,
  imports: [NzTabsModule, UsersComponent, ProductsComponent, OrdersComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.less',
})
export class AdminComponent {}
