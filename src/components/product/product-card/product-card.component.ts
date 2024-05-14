import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ts-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ProductCardComponent {
  @Input('class') clazz!: string;
  @Input() style!: string;
}
