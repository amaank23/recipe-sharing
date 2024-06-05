import { myDataSource } from "../app-data-source";
import { Friend } from "../entities/Friend";

export const FriendsRepository = myDataSource.getRepository(Friend);
