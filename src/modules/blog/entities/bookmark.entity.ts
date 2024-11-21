import { EntityNames } from 'src/common/enums/entity.enum';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BlogEntity } from './blog.entity';

@Entity(EntityNames.BlogBookmarks)
export class BlogBookmarkEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  blogId: number;
  @Column()
  userId: number;
  @ManyToOne(() => UserEntity, (user) => user.blog_bookmarks, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
  @ManyToOne(() => BlogEntity, (blog) => blog.bookmarks, {
    onDelete: 'CASCADE',
  })
  blog: BlogEntity;
}
