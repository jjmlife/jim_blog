import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as csurf from 'csurf';

import { HttpExceptionFilter } from './utils/http-exception.filter';
import { AllExceptionFilter } from './utils/all-exception.filter';
import { AppModule } from './app.module';
import { ReportLogger } from './log/ReportLogger';
import { LogInterceptor } from './log/log.interceptor';
import { TransformInterceptor } from './utils/transform.interceptor';

// import { Log4jsLogger } from './libs/log4js/';
import { Log4jsLogger } from '@nestx-log4js/core';

const ENV = process.env.NODE_ENV;

const setupSwagger = (app) => {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Api')
    .setDescription('API 文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};

async function bootstrap() {
  const reportLogger = new ReportLogger();
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
    logger: reportLogger,
  });
  app.useLogger(app.get(Log4jsLogger));
  // app.use(csurf());
  app.setGlobalPrefix('api');
  // app.useStaticAssets(join(__dirname, '..', 'upload_dist'));
  app.useGlobalFilters(new HttpExceptionFilter(), new AllExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      // fix parameter escape
      whitelist: true,
    }),
  );

  app.useGlobalInterceptors(
    new LogInterceptor(reportLogger),
    new TransformInterceptor(),
  );

  if (ENV !== 'prod') {
    setupSwagger(app);
  }

  await app.listen(5000);
}
bootstrap();
