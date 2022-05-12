import { Module } from '@nestjs/common';
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

@Module({
  imports: [UserModule, AuthModule, ArticleModule, CategoryModule, CommentModule],
  controllers: [AppController, UserController, AuthController, ArticleController, CategoryController, CommentController],
  providers: [AppService, AuthService, CategoryService, CommentService],
})
export class AppModule {}
