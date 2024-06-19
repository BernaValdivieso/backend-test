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
  update({
    productId,
    name,
    description,
    price,
    isAvailable,
  }: {
    productId: string;
    name: string;
    description: string;
    price: number;
    isAvailable: boolean;
  }): Promise<Product>;
  delete(productId: string): Promise<void>;
}
