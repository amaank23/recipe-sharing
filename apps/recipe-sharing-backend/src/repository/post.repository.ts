import { myDataSource } from "../app-data-source";
import Post from "../entities/Post";

export const PostRepository = myDataSource.getRepository(Post);
