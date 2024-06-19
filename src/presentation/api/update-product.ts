import * as yup from "yup";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { handleError } from "../../domain/errors/handle-error";
import { ProductRepository } from "../../data/repositories/product.repository";
import { UpdateProductUseCase, UpdateProductUseCaseInterface } from "../../domain/use.cases/update-product.use-case";

const HEADERS = {
  "content-type": "application/json",
};

const requestSchema = yup.object().shape({
  pathParameters: yup
    .object()
    .shape({
      productId: yup.string().required("ProductId is required"),
    })
    .required(),
  body: yup
    .object()
    .shape({
      name: yup.string(),
      description: yup.string(),
      price: yup.number(),
      isAvailable: yup.boolean(),
    })
    .required(),
});

const UpdateProductHandler =
  ({ updateProductUseCase }: { updateProductUseCase: UpdateProductUseCaseInterface }) =>
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      await requestSchema.validate(
        {
          pathParameters: event.pathParameters,
          body: JSON.parse(event.body as string),
        },
        { abortEarly: false },
      );

      const updatedProduct = await updateProductUseCase.execute({
        productId: event.pathParameters?.productId,
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
export const handler = updateProductHandler;
