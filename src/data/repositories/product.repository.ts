import { v4 } from "uuid";
import { Product } from "../../domain/entities/product.entity";
import { ProductRepositoryInterface } from "../../domain/repository-interfaces/product.repository-interface";
import AWS from "aws-sdk";

const TABLE_NAME = "ProductsTable";

const mapDynamoDBItemToProduct = (item: AWS.DynamoDB.DocumentClient.AttributeMap): Product => {
  return {
    productId: item.productId,
    name: item.name,
    description: item.description,
    price: item.price,
    isAvailable: item.isAvailable,
  };
};

export const ProductRepository = (): ProductRepositoryInterface => ({
  get: async (productId) => {
    const docClient = new AWS.DynamoDB.DocumentClient();

    const output = await docClient
      .get({
        TableName: TABLE_NAME,
        Key: {
          productId,
        },
      })
      .promise();

    return output.Item ? mapDynamoDBItemToProduct(output.Item) : null;
  },

  getAll: async () => {
    const docClient = new AWS.DynamoDB.DocumentClient();

    const output = await docClient.scan({ TableName: TABLE_NAME }).promise();

    return output.Items?.map(mapDynamoDBItemToProduct) ?? [];
  },

  create: async (params) => {
    const docClient = new AWS.DynamoDB.DocumentClient();

    const product = {
      ...params,
      productId: v4(),
    };

    await docClient
      .put({
        TableName: TABLE_NAME,
        Item: product,
      })
      .promise();

    return product;
  },

  update: async (product) => {
    const docClient = new AWS.DynamoDB.DocumentClient();

    await docClient
      .put({
        TableName: TABLE_NAME,
        Item: product,
      })
      .promise();

    return product;
  },

  delete: async (productId) => {
    const docClient = new AWS.DynamoDB.DocumentClient();

    await docClient
      .delete({
        TableName: TABLE_NAME,
        Key: {
          productId,
        },
      })
      .promise();
  },
});
