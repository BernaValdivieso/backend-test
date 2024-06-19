import { ProductRepository } from "../../../data/repositories/product.repository";
import { ProductFactory } from "../../factories/product.factory";

const mockDynamoDB = {
  get: jest.fn().mockReturnThis(),
  put: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
  scan: jest.fn().mockReturnThis(),
  promise: jest.fn(),
};

jest.mock("aws-sdk", () => {
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => mockDynamoDB),
    },
  };
});

describe("ProductRepository", () => {
  const repository = ProductRepository();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("get", () => {
    it("should  get product", async () => {
      expect.hasAssertions();

      // Arrange.
      const mockedProduct = ProductFactory.build();
      const id = mockedProduct.productId;

      mockDynamoDB.promise.mockResolvedValueOnce({ Item: mockedProduct });

      // Act.
      const result = await repository.get(id);

      // Assert.
      expect(result).toStrictEqual(mockedProduct);
      expect(mockDynamoDB.get).toHaveBeenCalledWith({
        TableName: "ProductsTable",
        Key: { productId: id },
      });
    });

    it("should return null if product does not exist", async () => {
      expect.hasAssertions();

      // Arrange.
      const id = "non-existing-id";

      mockDynamoDB.promise.mockResolvedValueOnce({ Item: null });

      // Act.
      const result = await repository.get(id);

      // Assert.
      expect(result).toBeNull();
      expect(mockDynamoDB.get).toHaveBeenCalledWith({
        TableName: "ProductsTable",
        Key: { productId: id },
      });
    });
  });

  describe("getAll", () => {
    it("should get all products", async () => {
      expect.hasAssertions();

      // Arrange.
      const mockedProducts = ProductFactory.buildList(3);

      mockDynamoDB.promise.mockResolvedValueOnce({ Items: mockedProducts });

      // Act.
      const result = await repository.getAll();

      // Assert.
      expect(result).toStrictEqual(mockedProducts);
      expect(mockDynamoDB.scan).toHaveBeenCalledWith({ TableName: "ProductsTable" });
    });

    it("should return an empty array if there are no products", async () => {
      expect.hasAssertions();

      // Arrange.
      mockDynamoDB.promise.mockResolvedValueOnce({ Items: null });

      // Act.
      const result = await repository.getAll();

      // Assert.
      expect(result).toStrictEqual([]);
      expect(mockDynamoDB.scan).toHaveBeenCalledWith({ TableName: "ProductsTable" });
    });
  });

  describe("create", () => {
    it("should create a product", async () => {
      expect.hasAssertions();

      // Arrange.
      const mockedProduct = ProductFactory.build();

      // Act.
      const createdProduct = await repository.create(mockedProduct);

      // Assert.
      expect(createdProduct).toStrictEqual({ ...mockedProduct, productId: createdProduct.productId });
      expect(mockDynamoDB.put).toHaveBeenCalledWith({
        TableName: "ProductsTable",
        Item: { ...mockedProduct, productId: createdProduct.productId },
      });
    });
  });

  describe("update", () => {
    it("should update a product", async () => {
      expect.hasAssertions();

      // Arrange.
      const mockedProduct = ProductFactory.build();

      // Act.
      const updatedProduct = await repository.update(mockedProduct);

      // Assert.
      expect(updatedProduct).toStrictEqual(mockedProduct);
      expect(mockDynamoDB.put).toHaveBeenCalledWith({
        TableName: "ProductsTable",
        Item: mockedProduct,
      });
    });
  });

  describe("delete", () => {
    it("should delete a product", async () => {
      expect.hasAssertions();

      // Arrange.
      const mockedProduct = ProductFactory.build();
      const id = mockedProduct.productId;

      // Act.
      await repository.delete(id);

      // Assert.
      expect(mockDynamoDB.delete).toHaveBeenCalledWith({
        TableName: "ProductsTable",
        Key: { productId: id },
      });
    });
  });
});
