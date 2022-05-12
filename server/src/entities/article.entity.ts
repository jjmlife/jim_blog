import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Entity()
export class Article {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'title' })
  @Column({ length: 255, nullable: false })
  title: string;

  @ApiProperty({ description: 'description' })
  @Column({ length: 255, nullable: false })
  desc: string;

  @ApiProperty({ description: '封面图' })
  @Column({ name: 'img_url', length: 255, nullable: true })
  imgUrl: string;

  @ApiProperty({ description: 'content' })
  @Column({ name: 'content', type: 'text', nullable: true })
  content: string;

  @ApiProperty({ description: 'content' })
  @Column({ name: 'seo_keyword', length: 255, nullable: true })
  seoKeyword: string;

  @ApiProperty({ description: '浏览次数' })
  @Column({ name: 'views', default: 0, nullable: true })
  views: number;

  @ApiProperty({ description: '点赞数' })
  @Column({ name: 'likes_num', default: 0, nullable: true })
  likesNum: number;

  @ApiProperty({ description: '作者id' })
  @Column({ name: 'athor_id', nullable: false })
  authorId: number;

  @ApiProperty({ description: '分类id' })
  @Column({ name: 'category_id', nullable: false })
  categoryId: number;

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
