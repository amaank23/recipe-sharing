import { myDataSource } from "../app-data-source";
import { FriendRequest } from "../entities/FriendRequest";

export const FriendRequestRepository =
  myDataSource.getRepository(FriendRequest);
