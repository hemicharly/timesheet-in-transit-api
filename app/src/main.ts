import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { HttpExceptionFilter } from '@application/web/exceptions/filters';
import { CustomValidationPipe } from '@application/web/exceptions';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as compression from 'compression';
import helmet from 'helmet';
import { SetupRedoc, SwaggerDoc } from '@application/web/config/swagger';
import { configEnv } from '@src/config.env';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  SwaggerDoc(app);
  SetupRedoc(app);

  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ limit: '20mb', extended: true }));
  app.use(helmet());
  app.use(compression());

  await app.listen(configEnv.app.port, configEnv.app.host);

  Logger.log(`Server running on http://${configEnv.app.host}:${configEnv.app.port} environment: ${configEnv.nodeEnv}`, 'Bootstrap');
}

bootstrap();