import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { CheckApiKeyUsecase } from '@core/usecases/auth';
import { Request } from 'express';
import { CheckApiKeyUsecaseImpl } from '@core/usecases/auth/impl';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  @Inject(CheckApiKeyUsecaseImpl.name)
  private readonly checkApiKeyUsecase: CheckApiKeyUsecase;

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const xApiKey = <string>request.headers['x-api-key'] || null;
    const entity = await this.checkApiKeyUsecase.execute(xApiKey);
    request.userId = entity.userId;
    return true;
  }
}