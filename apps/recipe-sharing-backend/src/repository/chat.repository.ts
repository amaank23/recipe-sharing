import { myDataSource } from "../app-data-source";
import { Chat } from "../entities/Chat";

export const ChatRepository = myDataSource.getRepository(Chat);
