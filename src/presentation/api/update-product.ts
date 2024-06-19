import * as yup from "yup";
import { GetProductUseCase, GetProductUseCaseInterface } from "../../domain/use.cases/get-product.use-case";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { handleError } from "../../domain/errors/handle-error";
import { ProductRepository } from "../../data/repositories/product.repository";
import { CreateProductUseCase, CreateProductUseCaseInterface } from "../../domain/use.cases/create-product.use-case";
import { UpdateProductUseCase, UpdateProductUseCaseInterface } from "../../domain/use.cases/update-product.use-case";
import { CustomError } from "../../domain/errors/custom-error";

const HEADERS = {
  "content-type": "application/json",
};

const requestSchema = yup.object({
  params: yup.object({
    productId: yup.string().required(),
  }),
  body: yup.object({
    name: yup.string(),
    description: yup.string(),
    price: yup.number(),
    isAvailable: yup.boolean(),
  }),
});

const UpdateProductHandler =
  ({ updateProductUseCase }: { updateProductUseCase: UpdateProductUseCaseInterface }) =>
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      if (!event.pathParameters) {
        throw new CustomError(400, { error: "Missing path parameters" });
      }

      await requestSchema.validate(
        {
          params: event.pathParameters,
          body: JSON.parse(event.body as string),
        },
        { abortEarly: false },
      );

      const updatedProduct = await updateProductUseCase.execute({
        productId: event.pathParameters.productId,
        ...JSON.parse(event.body as string),
      });

      return {
        statusCode: 200,
        headers: HEADERS,
        body: JSON.stringify(updatedProduct),
      };
    } catch (error) {
      return handleError(error);
    }
  };

const productRepository = ProductRepository();
const updateProductUseCase = UpdateProductUseCase({ productRepository });

export const updateProductHandler = UpdateProductHandler({ updateProductUseCase });
export const handler = UpdateProductHandler;
