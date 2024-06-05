import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class FriendRequest {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  sender: User;

  @ManyToOne(() => User)
  receiver: User;

  @Column({
    type: "enum",
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  })
  status: "pending" | "accepted" | "rejected";

  @CreateDateColumn()
  requestDate: Date;
}
