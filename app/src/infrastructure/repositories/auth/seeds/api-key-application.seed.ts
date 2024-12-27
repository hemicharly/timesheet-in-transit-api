import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ApiKeyApplication } from '@infrastructure/repositories/auth/entity/api-key-application.entity';

@Injectable()
export class ApiKeyApplicationSeed {
  constructor(
    @InjectRepository(ApiKeyApplication)
    private readonly repository: Repository<ApiKeyApplication>,
  ) {}

  public async seed(): Promise<void> {
    const apiKeyApplication1 = new ApiKeyApplication();
    apiKeyApplication1.apiKey = this.genApiKey();
    apiKeyApplication1.description = 'funcionario-01';
    apiKeyApplication1.userId = uuid();
    apiKeyApplication1.createdAt = new Date().toJSON();

    const apiKeyApplication2 = new ApiKeyApplication();
    apiKeyApplication2.apiKey = this.genApiKey();
    apiKeyApplication2.description = 'funcionario-02';
    apiKeyApplication2.userId = uuid();
    apiKeyApplication2.createdAt = new Date().toJSON();

    const apiKeyApplication3 = new ApiKeyApplication();
    apiKeyApplication3.apiKey = this.genApiKey();
    apiKeyApplication3.description = 'funcionario-03';
    apiKeyApplication3.userId = uuid();
    apiKeyApplication3.createdAt = new Date().toJSON();

    console.log('apiKeyApplication: ', {
      apiKeyApplication1,
      apiKeyApplication2,
      apiKeyApplication3,
    });

    await this.repository.save([apiKeyApplication1, apiKeyApplication2, apiKeyApplication3]);
  }

  private genApiKey(): string {
    return [...Array(30)].map(() => ((Math.random() * 36) | 0).toString(36)).join('');
  }
}