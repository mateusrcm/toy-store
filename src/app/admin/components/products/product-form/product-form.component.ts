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

import { Image, Product } from '../../../../../components/product/product.type';
import { ProductsService } from '../../../../../shared/services/products.service';
import { updateTreeValidity } from '../../../../../shared/helpers/form';

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
  searchValue: string = '';

  constructor(
    private fb: NonNullableFormBuilder,
    private nzImageService: NzImageService,
    private productService: ProductsService,
  ) {}

  handlePreview = async (_: NzUploadFile): Promise<void> => {
    const promises = this.fileList.map((file) => getBase64(file.originFileObj));
    const resolved = await Promise.all(promises);
    const images = resolved.map((img) => ({ src: img as string }));

    this.nzImageService.preview(images, {
      nzZoom: 1,
      nzRotate: 0,
      nzScaleStep: 0.5,
    });
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']?.currentValue) {
      const product: Product = changes['product'].currentValue;

      this.fileList = [];

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

  async submitForm(): Promise<void> {
    if (this.productForm.valid) {
      const callback = (product: Product) => {
        this.saveEmitter.emit(product);
      };

      const promises = this.fileList.map((file) => {
        if (file['id']) {
          return new Promise<Image>((resolve, reject) => {
            resolve({
              id: file['id'],
              url: file.url as string,
            });
          });
        }
        return getBase64(file.originFileObj);
      });
      const resolved = await Promise.all(promises);
      const images = resolved.map((img) => {
        if (typeof img === 'string') return { url: img as string } as Image;
        else return img as Image;
      });

      const value = this.productForm.getRawValue();

      const product: Product = {
        ...value,
        product_images: images,
        avaliationsCount: 0,
        averageRate: 0,
        enabled: true,
      };

      if (this.product.id) {
        product.id = this.product.id;
        this.productService.put(product).subscribe(callback);
      } else {
        this.productService.post(product).subscribe(callback);
      }
    } else {
      updateTreeValidity(this.productForm);
    }
  }

  cancel(): void {
    this.cancelEmitter.emit();
  }

  searchTag(value: string) {
    this.searchValue = value;
  }
}
