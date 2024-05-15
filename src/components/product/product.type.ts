export interface Product {
  id: number | null;
  name: string;
  description: string;
  tags: string[];
  averageRate: number;
  avaliationsCount: number;
}
