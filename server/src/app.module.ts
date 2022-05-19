import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ArticleController } from './article/article.controller';
import { ArticleModule } from './article/article.module';
import { CategoryService } from './category/category.service';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';
import { CommentService } from './comment/comment.service';
import { CommentController } from './comment/comment.controller';
import { CommentModule } from './comment/comment.module';
import loadConfig from './config/config';
// import { Log4jsModule } from './libs/log4js/';
import { Log4jsModule } from '@nestx-log4js/core';

const DOCKER_ENV = process.env.DOCKER_ENV;

const serviceModules = [
  UserModule,
  AuthModule,
  ArticleModule,
  CategoryModule,
  CommentModule,
];

const libModules = [
  ConfigModule.forRoot({
    load: [loadConfig],
    envFilePath: [DOCKER_ENV ? '.docker.env' : '.env'],
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const { host, port, username, password, database } =
        configService.get('db');

      return {
        type: 'mysql',
        host,
        port,
        username,
        password,
        database,
        entities: ['dist/**/*.entity{.ts,.js}'],
      };
    },
  }),
  Log4jsModule.forRoot(),
];

@Module({
  imports: [...libModules, ...serviceModules],
  controllers: [
    AppController,
    UserController,
    AuthController,
    ArticleController,
    CategoryController,
    CommentController,
  ],
  providers: [AppService, AuthService, CategoryService, CommentService],
})
export class AppModule {}
