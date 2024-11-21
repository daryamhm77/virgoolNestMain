import { EntityNames } from 'src/common/enums/entity.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity(EntityNames.Follow)
export class FollowEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  followingId: number;
  @Column()
  followerId: number;
  @ManyToOne(() => UserEntity, (user) => user.followers, {
    onDelete: 'CASCADE',
  })
  following: UserEntity;
  @ManyToOne(() => UserEntity, (user) => user.following, {
    onDelete: 'CASCADE',
  })
  follower: UserEntity;
  @CreateDateColumn()
  created_at: Date;
}
