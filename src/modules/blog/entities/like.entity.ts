import { EntityNames } from 'src/common/enums/entity.enum';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BlogEntity } from './blog.entity';

@Entity(EntityNames.BlogLikes)
export class BlogLikesEntity {
@PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  blogId: number;
  @Column()
  userId: number;
  @ManyToOne(() => UserEntity, (user) => user.blog_likes, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
  @ManyToOne(() => BlogEntity, (blog) => blog.likes, { onDelete: 'CASCADE' })
  blog: BlogEntity;
}
