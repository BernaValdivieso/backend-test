import { ProductRepositoryInterface } from "../repository-interfaces/product.repository-interface";
import { validateProduct } from "./validators/validate-product";

interface DeleteProductUseCaseParams {
  productId: string;
}

export interface DeleteProductUseCaseInterface {
  execute: (params: DeleteProductUseCaseParams) => Promise<void>;
}

export const DeleteProductUseCase = ({
  productRepository,
}: {
  productRepository: ProductRepositoryInterface;
}): DeleteProductUseCaseInterface => ({
  execute: async ({ productId }: DeleteProductUseCaseParams) => {
    await productRepository.get(productId).then(validateProduct({ productId }));

    await productRepository.delete(productId);
  },
});
