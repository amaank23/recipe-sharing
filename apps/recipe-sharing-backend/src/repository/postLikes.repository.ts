import { myDataSource } from "../app-data-source";
import PostLikes from "../entities/PostLikes";

export const PostLikesRepository = myDataSource.getRepository(PostLikes);
