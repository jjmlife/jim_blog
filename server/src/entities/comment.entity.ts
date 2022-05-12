import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Comment {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'content' })
  @Column({ length: 255, nullable: false })
  content: string;

  @ApiProperty({ description: 'articleId' })
  @Column({ name: 'article_id', nullable: false })
  articleId: number;

  @ApiProperty({ description: 'user_id' })
  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @ApiProperty({ description: '匿名评论的email' })
  @Column({ name: 'email', nullable: true })
  email: string;

  @ApiProperty({ description: 'create_time' })
  @CreateDateColumn({ type: 'timestamp', name: 'create_time' })
  createTime: Date;

  @ApiProperty({ description: 'update_time' })
  @UpdateDateColumn({ type: 'timestamp', name: 'update_time' })
  updateTime: Date;

  /// soft delete
  @ApiProperty({ description: 'status' })
  @Column({
    type: 'tinyint',
    name: 'status',
    default: 1,
    comment: '0 - 软删除 , 1- 正常',
  })
  status: number;
}
