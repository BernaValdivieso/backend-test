import { faker } from "@faker-js/faker";
import { Factory } from "rosie";
import { Product } from "../../domain/entities/product.entity";

export const ProductFactory = new Factory<Product>()
  .attr("productId", faker.string.uuid)
  .attr("name", faker.commerce.productName)
  .attr("description", faker.commerce.productDescription)
  .attr("price", faker.number.int)
  .attr("isAvailable", faker.datatype.boolean);
