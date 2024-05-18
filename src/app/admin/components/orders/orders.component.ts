import { Component, Input } from '@angular/core';
import { NzTabPosition } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'ts-orders',
  standalone: true,
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.less',
})
export class OrdersComponent {
  @Input({ required: true }) position!: NzTabPosition;

  isDrawerOpen: boolean = false;
}
