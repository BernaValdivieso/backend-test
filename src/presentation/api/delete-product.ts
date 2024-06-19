import * as yup from "yup";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { handleError } from "../../domain/errors/handle-error";
import { ProductRepository } from "../../data/repositories/product.repository";
import { DeleteProductUseCase, DeleteProductUseCaseInterface } from "../../domain/use.cases/delete-product.use-case";

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
});

const DeleteProductHandler =
  ({ deleteProductUseCase }: { deleteProductUseCase: DeleteProductUseCaseInterface }) =>
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      await requestSchema.validate(
        {
          pathParameters: event.pathParameters,
        },
        { abortEarly: false },
      );

      await deleteProductUseCase.execute({ productId: event.pathParameters?.productId as string });

      return {
        statusCode: 204,
        headers: HEADERS,
        body: "",
      };
    } catch (error) {
      return handleError(error);
    }
  };

const productRepository = ProductRepository();
const deleteProductUseCase = DeleteProductUseCase({ productRepository });

export const deleteProductHandler = DeleteProductHandler({ deleteProductUseCase });
export const handler = deleteProductHandler;
