import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import User from "./User";
import PostLikes from "./PostLikes";
import PostImages from "./PostImages";
import PostComments from "./PostComments";
import Recipe from "./Recipe";
@Entity()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  content: string;

  @Column({
    type: "enum",
    enum: ["normal", "recipe"],
    default: "normal",
  })
  postType: "normal" | "recipe";

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @OneToMany(() => PostLikes, (postLikes) => postLikes.post)
  postLikes: PostLikes[];

  @OneToMany(() => PostImages, (postImages) => postImages.post)
  postImages: PostImages[];

  @OneToMany(() => PostComments, (postComments) => postComments.post)
  postComments: PostComments[];

  @OneToOne(() => Recipe, (recipe) => recipe.post)
  @JoinColumn()
  recipe: Recipe;

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
