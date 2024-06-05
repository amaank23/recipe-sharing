import { myDataSource } from "../app-data-source";
import PostComments from "../entities/PostComments";

export const PostCommentsRepository = myDataSource.getRepository(PostComments);
