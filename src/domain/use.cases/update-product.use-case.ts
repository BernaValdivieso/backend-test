import { Product } from "../entities/product.entity";
import { ProductRepositoryInterface } from "../repository-interfaces/product.repository-interface";
import { validateProduct } from "./validators/validate-product";

const constructUpdateProductParams = ({
  name,
  description,
  price,
  isAvailable,
}: {
  name?: string;
  description?: string;
  price?: number;
  isAvailable?: boolean;
}) => ({
  ...(name && { name }),
  ...(description && { description }),
  ...(price && { price }),
  ...(isAvailable && { isAvailable }),
});

interface UpdateProductUseCaseParams {
  productId: string;
  name?: string;
  description?: string;
  price?: number;
  isAvailable?: boolean;
}

export interface UpdateProductUseCaseInterface {
  execute: (params: UpdateProductUseCaseParams) => Promise<Product>;
}

export const UpdateProductUseCase = ({
  productRepository,
}: {
  productRepository: ProductRepositoryInterface;
}): UpdateProductUseCaseInterface => ({
  execute: async ({ productId, name, description, price, isAvailable }: UpdateProductUseCaseParams) => {
    const product = await productRepository.get(productId).then(validateProduct({ productId }));

    const updateProductParams = constructUpdateProductParams({ name, description, price, isAvailable });

    const updatedProduct = await productRepository.update({ ...product, ...updateProductParams });

    return updatedProduct;
  },
});
