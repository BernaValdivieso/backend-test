import * as yup from "yup";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { handleError } from "../../domain/errors/handle-error";
import { ProductRepository } from "../../data/repositories/product.repository";
import { CreateProductUseCase, CreateProductUseCaseInterface } from "../../domain/use.cases/create-product.use-case";

const HEADERS = {
  "content-type": "application/json",
};

const requestSchema = yup.object().shape({
  body: yup
    .object()
    .shape({
      name: yup.string().required(),
      description: yup.string().required(),
      price: yup.number().required(),
      isAvailable: yup.boolean().required(),
    })
    .required(),
});

const CreateProductHandler =
  ({ createProductUseCase }: { createProductUseCase: CreateProductUseCaseInterface }) =>
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      await requestSchema.validate(
        {
          body: JSON.parse(event.body as string),
        },
        { abortEarly: false },
      );

      const { name, description, price, isAvailable } = JSON.parse(event.body as string);

      const product = await createProductUseCase.execute({
        name,
        description,
        price,
        isAvailable,
      });

      return {
        statusCode: 201,
        headers: HEADERS,
        body: JSON.stringify(product),
      };
    } catch (error) {
      return handleError(error);
    }
  };

const productRepository = ProductRepository();
const createProductUseCase = CreateProductUseCase({ productRepository });

export const createProductHandler = CreateProductHandler({ createProductUseCase });
export const handler = createProductHandler;
