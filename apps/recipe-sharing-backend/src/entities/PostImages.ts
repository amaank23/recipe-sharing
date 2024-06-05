import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import Post from "./Post";
@Entity()
export class PostImages {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  url: string;

  @ManyToOne(() => Post, (post) => post.postImages)
  post: Post;

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

export default PostImages;
