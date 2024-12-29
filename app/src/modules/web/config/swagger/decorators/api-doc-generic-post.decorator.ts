import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponse } from '@application/web/shared/response/error';

export function ApiDocGenericPost(value: string, modelType?: Type) {
  return applyDecorators(
    ApiOperation({ summary: `Create a new ${value}` }),
    modelType
      ? ApiCreatedResponse({
          description: `The ${value} successfully created`,
          type: modelType,
        })
      : ApiNoContentResponse({
          description: `The ${value} successfully created`,
        }),
    ApiBadRequestResponse({ description: `Bad request.`, type: ErrorResponse }),
    ApiConflictResponse({ description: 'Conflict of resource.', type: ErrorResponse }),
    ApiUnauthorizedResponse({ description: 'Unauthorized.', type: ErrorResponse }),
    ApiNotFoundResponse({ description: 'Resource not found.', type: ErrorResponse }),
    ApiInternalServerErrorResponse({ description: 'Internal server error.', type: ErrorResponse }),
  );
}
