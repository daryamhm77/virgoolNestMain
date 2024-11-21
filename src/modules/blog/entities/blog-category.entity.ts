import { EntityNames } from 'src/common/enums/entity.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BlogEntity } from './blog.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';

@Entity(EntityNames.BlogCategory)
export class BlogCategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  blogId: number;
  @Column()
  categoryId: number;
  title: string;
  @ManyToOne(() => BlogEntity, (blog) => blog.categories, {
    onDelete: 'CASCADE',
  })
  blog: BlogEntity;
  @ManyToOne(() => CategoryEntity, (category) => category.blog_categories, {
    onDelete: 'CASCADE',
  })
  category: CategoryEntity;
}
