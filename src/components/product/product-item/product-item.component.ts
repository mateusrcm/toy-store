import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ts-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent {}
