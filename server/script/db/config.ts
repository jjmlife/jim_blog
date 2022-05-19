import { DataSourceOptions } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Article } from 'src/entities/article.entity';
import { Category } from 'src/entities/category.entity';
import { Comment } from 'src/entities/comment.entity';

const ormConfig: DataSourceOptions = {
  type: 'mysql',
  database: 'nest_todo',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'jjm123456',
  entities: [User, Article, Category, Comment],
};

export default ormConfig;
