import { Product } from "../../entities/product.entity";
import { CustomError } from "../../errors/custom-error";

export const validateProduct =
  ({ productId }: { productId: string }) =>
  (product: Product | null) => {
    if (!product) {
      throw new CustomError(404, { error: `Product with productId ${productId} not found` });
    }

    return product;
  };
