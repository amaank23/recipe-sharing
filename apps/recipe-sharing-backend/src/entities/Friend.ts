import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from "typeorm";
import { User } from "./User";

@Entity()
@Unique(["user1", "user2"])
export class Friend {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  user1: User;

  @ManyToOne(() => User)
  user2: User;

  @CreateDateColumn()
  friendshipDate: Date;
}
