import * as yup from "yup";
import { GetProductUseCase, GetProductUseCaseInterface } from "../../domain/use.cases/get-product.use-case";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { handleError } from "../../domain/errors/handle-error";
import { ProductRepository } from "../../data/repositories/product.repository";

const HEADERS = {
  "content-type": "application/json",
};

const requestSchema = yup.object().shape({
  productId: yup.string().required(),
});

const GetProductHandler =
  ({ getProductUseCase }: { getProductUseCase: GetProductUseCaseInterface }) =>
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      await requestSchema.validate(event.pathParameters, { abortEarly: false });

      const product = await getProductUseCase.execute({ productId: event.pathParameters?.productId as string });

      return {
        statusCode: 200,
        headers: HEADERS,
        body: JSON.stringify(product),
      };
    } catch (error) {
      return handleError(error);
    }
  };

const productRepository = ProductRepository();
const getProductUseCase = GetProductUseCase({ productRepository });

export const getProductHandler = GetProductHandler({ getProductUseCase });
export const handler = getProductHandler;
