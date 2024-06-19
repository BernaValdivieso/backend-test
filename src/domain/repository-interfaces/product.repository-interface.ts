import { Product } from "../entities/product.entity";

export interface ProductRepositoryInterface {
  get(productId: string): Promise<Product | null>;
  getAll(): Promise<Product[]>;
  create(product: Product): Promise<Product>;
  update(product: Product): Promise<Product>;
  delete(productId: string): Promise<void>;
}
