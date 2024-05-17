export interface Product {
  id: number | null;
  name: string;
  description: string;
  tags: string[];
  averageRate: number;
  price: number;
  stock: number;
  avaliationsCount: number;
  product_avaliations: Avaliation[] | null;
  product_images: Image[] | null;
  enabled: boolean;
}

export interface Avaliation {
  id: number | null;
  rate: number;
  comment: string;
  userId: 30;
}

export interface Image {
  // TODO currently saving as base/64, change to upload image and save URL instead
  id: number | null;
  url: string;
}
