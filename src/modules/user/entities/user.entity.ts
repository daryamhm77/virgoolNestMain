import { EntityNames } from 'src/common/enums/entity.enum';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OtpEntity } from './otp.entity';
import { BlogEntity } from 'src/modules/blog/entities/blog.entity';
import { BlogLikesEntity } from 'src/modules/blog/entities/like.entity';
import { BlogBookmarkEntity } from 'src/modules/blog/entities/bookmark.entity';
import { BlogCommentEntity } from 'src/modules/blog/entities/comment.entity';
import { ProfileEntity } from './profile.entity';
import { ImageEntity } from 'src/modules/image/entities/image.entity';
import { Roles } from 'src/common/enums/role.enum';
import { FollowEntity } from './follow.entity';

@Entity(EntityNames.User)
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ unique: true, nullable: true })
  username: string;
  @Column({ unique: true, nullable: true })
  phone: string;
  @Column({ unique: true, nullable: true })
  email: string;
  @Column({ nullable: true })
  status: string;
  @Column({ nullable: true })
  new_email: string;
  @Column({ nullable: true })
  new_phone: string;
  @Column({ nullable: true, default: false })
  verify_email: boolean;
  @Column({ nullable: true, default: false })
  verify_phone: boolean;
  @Column({ nullable: true })
  password: string;
  @Column({ default: Roles.User })
  role: string;
  @Column({ nullable: true })
  otpId: number;
  @Column({ nullable: true })
  profileId: number;
  @OneToOne(() => OtpEntity, (otp) => otp.user)
  @JoinColumn()
  otp: OtpEntity;
  @OneToMany(() => BlogEntity, (blogs) => blogs.author)
  blogs: BlogEntity[];
  @OneToMany(() => BlogLikesEntity, (blog_likes) => blog_likes.user)
  blog_likes: BlogLikesEntity[];
  @OneToMany(() => BlogBookmarkEntity, (blog_bookmarks) => blog_bookmarks.user)
  blog_bookmarks: BlogBookmarkEntity[];
  @OneToMany(() => BlogCommentEntity, (blog_comments) => blog_comments.user)
  blog_comments: BlogCommentEntity[];
  @OneToOne(() => ProfileEntity, (profile) => profile.user)
  @JoinColumn()
  profile: ProfileEntity;
  @OneToMany(() => ImageEntity, (images) => images.user)
  images: ImageEntity[];
  @OneToMany(() => FollowEntity, (follow) => follow.following)
  followers: FollowEntity[];
  @OneToMany(() => FollowEntity, (follow) => follow.follower)
  following: FollowEntity[];
}
