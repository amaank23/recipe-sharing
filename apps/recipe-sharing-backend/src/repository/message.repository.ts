import { myDataSource } from "../app-data-source";
import { Message } from "../entities/Message";

export const MessageRepository = myDataSource.getRepository(Message);
