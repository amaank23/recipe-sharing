import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import Post from "./Post";
import User from "./User";
@Entity()
export class PostComments {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  comment: string;

  @ManyToOne(() => Post, (post) => post.postComments)
  post: Post;

  @ManyToOne(() => User, (user) => user.id)
  user: Post;

  @ManyToOne(
    () => PostComments,
    (postComments) => postComments.childrenComments
  )
  parentComment: PostComments;

  @OneToMany(() => PostComments, (postComments) => postComments.parentComment)
  childrenComments: PostComments[];

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

export default PostComments;
