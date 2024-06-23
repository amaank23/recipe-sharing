import { NextFunction, Request, Response } from "express";
import { ChatRepository } from "../repository/chat.repository";
import CustomError from "../utils/error";
import { MessageRepository } from "../repository/message.repository";
import { CustomRequest } from "../middlewares/authMiddleware";

const createChat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user1Id, user2Id } = req.body;
    const chatExist = await ChatRepository.createQueryBuilder()
      .leftJoinAndSelect("chat.user1", "user1")
      .leftJoinAndSelect("chat.user2", "user2")
      .where("user1.id = :user1Id AND user2.id = :user2Id", {
        user1Id,
        user2Id,
      })
      .orWhere("user1.id = :user2Id AND user2.id = :user1Id", {
        user1Id,
        user2Id,
      })
      .orderBy("message.created_at", "ASC")
      .getOne();
    if (chatExist) {
      res.status(200).json({ message: "Chat already exist.", data: chatExist });
    } else {
      const chat = ChatRepository.create();
      chat.user1 = user1Id;
      chat.user2 = user2Id;
      await ChatRepository.save(chat);
      res.status(201).json({ message: "Chat created.", data: chat });
    }
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
};

async function sendMessage(req: Request, res: Response, next: NextFunction) {
  try {
    const { chatId } = req.params;
    const { senderId, content, recieverId } = req.body;
    const message = MessageRepository.create();
    message.chat.id = chatId;
    message.sender.id = senderId;
    message.content = content;
    message.reciever.id = recieverId;
    await MessageRepository.save(message);
    req.socket.emit("sendMessage", message);
    res.status(201).json({ message: "Chat created.", data: message });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
}
async function getAllChatMessages(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { page, limit } = req.query;
    const { chatId } = req.params;
    const itemsToSkip = (+page - 1) * +limit;
    const messages = await MessageRepository.find({
      where: {
        chat: {
          id: chatId as string,
        },
      },
      relations: {
        chat: true,
        sender: true,
        reciever: true,
      },
      skip: itemsToSkip,
      take: +limit,
    });
    res
      .status(201)
      .json({ message: "Chat Messages Retrieved", data: messages });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
}

export default {
  createChat,
  sendMessage,
  getAllChatMessages,
};
