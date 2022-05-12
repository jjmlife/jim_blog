import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

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
  const app = await NestFactory.create(AppModule);

  if (ENV !== 'prod') {
    setupSwagger(app);
  }

  await app.listen(3000);
}
bootstrap();
