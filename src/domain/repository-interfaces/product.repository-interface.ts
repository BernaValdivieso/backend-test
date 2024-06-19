import { Product } from "../entities/product.entity";

export interface ProductRepositoryInterface {
  get(productId: string): Promise<Product | null>;
  getAll(): Promise<Product[]>;
  create({
    name,
    description,
    price,
    isAvailable,
  }: {
    name: string;
    description: string;
    price: number;
    isAvailable: boolean;
  }): Promise<Product>;
  update(product: Product): Promise<Product>;
  delete(productId: string): Promise<void>;
}
