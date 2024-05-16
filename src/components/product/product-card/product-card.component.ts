import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
} from '@angular/core';
import { Product } from '../product.type';

@Component({
  selector: 'ts-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Input() actions: TemplateRef<any>[] = [];
  @Input() klass!: string; // class
  @Input() stile!: string; // style

  currentImage: number = 0;
  fallback: string = '../../assets/img/empty-image.png';

  previousPic(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();

    this.currentImage--;
  }

  nextPic(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();

    this.currentImage++;
  }
}
