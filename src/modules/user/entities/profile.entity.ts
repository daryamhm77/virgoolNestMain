import { EntityNames } from 'src/common/enums/entity.enum';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity(EntityNames.Profile)
export class ProfileEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  nick_name: string;
  @Column({ nullable: true })
  bio: string;
  @Column({ nullable: true })
  image_profile: string;
  @Column({ nullable: true })
  bg_image: string;
  @Column({ nullable: true })
  gender: string;
  @Column({ nullable: true })
  birthday: Date;
  @Column({ nullable: true })
  x_profile: string;
  @Column({ nullable: true })
  linkedin_profile: string;
  @Column()
  userId: number;
  @OneToOne(() => UserEntity, (user) => user.profile)
  @JoinColumn()
  user: UserEntity;
}
