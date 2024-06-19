import * as yup from "yup";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { handleError } from "../../domain/errors/handle-error";
import { ProductRepository } from "../../data/repositories/product.repository";
import { GetProductsUseCase, GetProductsUseCaseInterface } from "../../domain/use.cases/get-products.use-case";

const HEADERS = {
  "content-type": "application/json",
};

const requestSchema = yup.object().shape({});

const GetProductsHandler =
  ({ getProductsUseCase }: { getProductsUseCase: GetProductsUseCaseInterface }) =>
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      await requestSchema.validate(event, { abortEarly: false });

      const products = await getProductsUseCase.execute();

      return {
        statusCode: 200,
        headers: HEADERS,
        body: JSON.stringify(products),
      };
    } catch (error) {
      return handleError(error);
    }
  };

const productRepository = ProductRepository();
const getProductsUseCase = GetProductsUseCase({ productRepository });

export const getProductsHandler = GetProductsHandler({ getProductsUseCase });
export const handler = getProductsHandler;
