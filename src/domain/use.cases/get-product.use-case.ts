import { Product } from "../entities/product.entity";
import { ProductRepositoryInterface } from "../repository-interfaces/product.repository-interface";
import { validateProduct } from "./validators/validate-product";

interface GetProductUseCaseParams {
  productId: string;
}

export interface GetProductUseCaseInterface {
  execute: (params: GetProductUseCaseParams) => Promise<Product>;
}

export const GetProductUseCase = ({
  productRepository,
}: {
  productRepository: ProductRepositoryInterface;
}): GetProductUseCaseInterface => ({
  execute: async ({ productId }: GetProductUseCaseParams) => {
    const product = await productRepository.get(productId).then(validateProduct({ productId }));

    return product;
  },
});
