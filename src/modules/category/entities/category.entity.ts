import { EntityNames } from 'src/common/enums/entity.enum';
import { BlogCategoryEntity } from 'src/modules/blog/entities/blog-category.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity(EntityNames.Category)
export class CategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  title: string;
  @Column({ nullable: true })
  priority: number;
  @OneToMany(
    () => BlogCategoryEntity,
    (blog_categories) => blog_categories.category,
  )
  blog_categories: BlogCategoryEntity[];
}
