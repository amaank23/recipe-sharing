import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import User from "./User";
import PostLikes from "./PostLikes";
import PostImages from "./PostImages";
import PostComments from "./PostComments";
@Entity()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  content: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @OneToMany(() => PostLikes, (postLikes) => postLikes.post)
  postLikes: PostLikes[];

  @OneToMany(() => PostImages, (postImages) => postImages.post)
  postImages: PostImages[];

  @OneToMany(() => PostComments, (postComments) => postComments.post)
  postComments: PostComments[];

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public updated_at: Date;
}

export default Post;
