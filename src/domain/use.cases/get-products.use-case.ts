import { Product } from "../entities/product.entity";
import { ProductRepositoryInterface } from "../repository-interfaces/product.repository-interface";

export interface GetProductsUseCaseInterface {
  execute: () => Promise<Product[]>;
}

export const GetProductsUseCase = ({
  productRepository,
}: {
  productRepository: ProductRepositoryInterface;
}): GetProductsUseCaseInterface => ({
  execute: async () => {
    const products = await productRepository.getAll();

    return products;
  },
});
