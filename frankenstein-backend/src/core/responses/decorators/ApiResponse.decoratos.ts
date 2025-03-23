import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";

// Api Erros
export const ApiErrorResponseBadRequest = (message: string | string[]) =>
  applyDecorators(
    ApiBadRequestResponse({
      description: "Erro: Bad Request",
      schema: {
        type: "object",
        example: {
          timestamp: "string",
          path: "string",
          error: {
            message: message,
            error: "Bad Request",
            statusCode: 400,
          },
        },
      },
    }),
  );

export const ApiErrorResponseUnauthorized = (message: string) =>
  applyDecorators(
    ApiUnauthorizedResponse({
      description: "Error: Unauthorized",
      schema: {
        type: "object",
        example: {
          timestamp: "string",
          path: "string",
          error: {
            message: message,
            error: "Unauthorized",
            statusCode: 401,
          },
        },
      },
    }),
  );
