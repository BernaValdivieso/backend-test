import { Product } from "../entities/product.entity";
import { ProductRepositoryInterface } from "../repository-interfaces/product.repository-interface";

interface CreateProductUseCaseParams {
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
}

export interface CreateProductUseCaseInterface {
  execute: (params: CreateProductUseCaseParams) => Promise<Product>;
}

export const CreateProductUseCase = ({
  productRepository,
}: {
  productRepository: ProductRepositoryInterface;
}): CreateProductUseCaseInterface => ({
  execute: async ({ name, description, price, isAvailable }: CreateProductUseCaseParams) => {
    const product = await productRepository.create({ name, description, price, isAvailable });

    return product;
  },
});
