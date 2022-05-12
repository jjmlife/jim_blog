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
export class User {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'username' })
  @Column({ length: 100, nullable: false, unique: true })
  username: string;

  @ApiProperty({ description: 'password' })
  @Column({ length: 100, nullable: false })
  password: string;

  @ApiProperty({ description: 'email' })
  @Column({ length: 100, nullable: false })
  email: string;

  @ApiProperty({ description: 'roles - 角色： admin, operator' })
  @Column({ length: 50, nullable: false, default: 'operator' })
  roles: string;

  @ApiProperty({ description: 'create_time' })
  @CreateDateColumn({ type: 'timestamp', name: 'create_time' })
  createTime: Date;

  @ApiProperty({ description: 'update_time' })
  @UpdateDateColumn({ type: 'timestamp', name: 'update_time' })
  updateTime: Date;

  /// soft delete
  @ApiProperty({ description: 'status - 0 - 无效， 1- 有效' })
  @Column({
    type: 'tinyint',
    name: 'status',
    default: 1,
    comment: '0 - soft delete , 1-',
  })
  status: number;

  @BeforeInsert()
  private async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
