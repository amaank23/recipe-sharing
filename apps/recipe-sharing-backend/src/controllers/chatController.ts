import { NextFunction, Request, Response } from "express";
import { ChatRepository } from "../repository/chat.repository";
import CustomError from "../utils/error";
import { MessageRepository } from "../repository/message.repository";
import { CustomRequest } from "../middlewares/authMiddleware";
import { UserRepository } from "../repository/user.repository";

const createChat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user1Id, user2Id } = req.body;
    const chatExist = await ChatRepository.createQueryBuilder("chat")
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

async function sendMessage(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { chatId } = req.params;
    const { senderId, content, recieverId } = req.body;
    const chat = await ChatRepository.findOne({ where: { id: chatId } });
    const sender = await UserRepository.findOne({ where: { id: senderId } });
    const reciever = await UserRepository.findOne({
      where: { id: recieverId },
    });
    const message = MessageRepository.create();
    message.chat = chat;
    message.sender = sender;
    message.content = content;
    message.reciever = reciever;
    await MessageRepository.save(message);
    req.io.to(message.chat.id).emit("newMessage", message);
    for (const [userId, socketId] of req.onlineUsers.entries()) {
      if (userId === recieverId) {
        req.io
          .to(socketId)
          .emit("newMessageRecieved", { user1: recieverId, user2: senderId });
        break;
      }
    }
    res.status(201).json({ message: "Chat created.", data: message });
  } catch (error) {
    console.log(error);
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
      order: {
        created_at: "DESC",
      },
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
