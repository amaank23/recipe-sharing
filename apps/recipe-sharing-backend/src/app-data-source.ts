import { DataSource } from "typeorm";
import dotenv from "dotenv";
import User from "./entities/User";
import Post from "./entities/Post";
import PostLikes from "./entities/PostLikes";
import PostImages from "./entities/PostImages";
import PostComments from "./entities/PostComments";
import Profile from "./entities/Profile";
import { FriendRequest } from "./entities/FriendRequest";
import { Friend } from "./entities/Friend";
import Ingredient from "./entities/Ingredient";
import Recipe from "./entities/Recipe";

dotenv.config();
export const myDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    User,
    Post,
    PostLikes,
    PostImages,
    PostComments,
    Profile,
    FriendRequest,
    Friend,
    Ingredient,
    Recipe,
  ],
  logging: true,
  synchronize: false,
  migrations: ["src/migrations/*{.ts,.js}"],
  migrationsTableName: "migrations",
});
