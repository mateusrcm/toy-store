import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule, NzImageService } from 'ng-zorro-antd/image';

import { isNil } from 'ng-zorro-antd/core/util';

import { Product } from '../../../../../components/product/product.type';
import { ProductsService } from '../../../../../shared/services/products.service';

const getBase64 = (
  file: File | undefined,
): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    if (isNil(file)) {
      reject();
    }

    const reader = new FileReader();
    reader.readAsDataURL(file!);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

@Component({
  selector: 'ts-product-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputNumberModule,
    NzTypographyModule,
    NzSelectModule,
    NzUploadModule,
    NzButtonModule,
    NzImageModule,
    NzInputModule,
    NzFormModule,
    NzIconModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.less',
})
export class ProductFormComponent {
  @Input({ required: true }) product!: Product;

  @Output('onCancel') cancelEmitter: EventEmitter<void> =
    new EventEmitter<void>();
  @Output('onSave') saveEmitter: EventEmitter<Product> =
    new EventEmitter<Product>();

  productForm: FormGroup<{
    name: FormControl<string>;
    description: FormControl<string>;
    tags: FormControl<string[]>;
    price: FormControl<number>;
    stock: FormControl<number>;
  }> = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    tags: [[] as string[], Validators.required],
    price: [0, Validators.required],
    stock: [0, Validators.required],
  });

  fileList: NzUploadFile[] = [];
  imgList: string[] = [];
  searchValue: string = '';

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);

    getBase64(file.originFileObj).then((img) => {
      this.imgList.push(img as string);
    });

    return false;
  };

  constructor(
    private fb: NonNullableFormBuilder,
    private nzImageService: NzImageService,
    private productService: ProductsService,
  ) {}

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    const IMAGES = this.imgList.map((img) => ({ src: img }));

    this.nzImageService.preview(IMAGES, {
      nzZoom: 1,
      nzRotate: 0,
      nzScaleStep: 0.5,
    });
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']?.currentValue) {
      const product: Product = changes['product'].currentValue;

      this.fileList = [];
      this.imgList = [];

      this.productForm.controls.name.setValue(product.name);
      this.productForm.controls.description.setValue(product.description);
      this.productForm.controls.price.setValue(product.price);
      this.productForm.controls.stock.setValue(product.stock);
      this.productForm.controls.tags.setValue(product.tags);

      product.product_images?.forEach((img, i) => {
        this.fileList = this.fileList.concat({
          id: img.id,
          uid: `-${img.id}`,
          name: `image${1}.png`,
          status: 'done',
          url: img.url,
        });
      });
    }
  }

  submitForm(): void {
    if (this.productForm.valid) {
      const callback = (product: Product) => {
        this.saveEmitter.emit(product);
      };

      const value = this.productForm.getRawValue();
      const product: Product = {
        ...value,
        avaliationsCount: 0,
        averageRate: 0,
        enabled: true,
      };

      if (this.product.id) {
        this.productService.put(product).subscribe(callback);
      } else {
        this.productService.post(product).subscribe(callback);
      }
    }
  }

  cancel(): void {
    this.cancelEmitter.emit();
  }

  searchTag(value: string) {
    this.searchValue = value;
  }
}
