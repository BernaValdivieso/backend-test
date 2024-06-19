import * as yup from "yup";
import { CustomError } from "./custom-error";

const HEADERS = {
  "content-type": "application/json",
};

export const handleError = (error: unknown) => {
  if (error instanceof yup.ValidationError) {
    return {
      statusCode: 400,
      headers: HEADERS,
      body: JSON.stringify({ errors: error.errors }),
    };
  }

  if (error instanceof SyntaxError) {
    return {
      statusCode: 400,
      headers: HEADERS,
      body: JSON.stringify({ error: `Invalid request body format: ${error.message}` }),
    };
  }

  if (error instanceof CustomError) {
    return {
      statusCode: error.statusCode,
      headers: HEADERS,
      body: error.message,
    };
  }
  throw error;
};
