import { NextFunction, Request, Response } from "express";
import { FriendRequestRepository } from "../repository/friendRequest.repository";
import CustomError from "../utils/error";
import { FriendsRepository } from "../repository/friends.repository";
import { CustomRequest } from "../middlewares/authMiddleware";

const sendFriendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { sender_id, receiver_id } = req.body;
  try {
    const friendRequest = FriendRequestRepository.create();
    friendRequest.sender = sender_id;
    friendRequest.receiver = receiver_id;
    await FriendRequestRepository.save(friendRequest);
    res.status(201).send({ message: "Friend request sent" });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
};

const acceptFriendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { sender_id, receiver_id } = req.body;
  try {
    await FriendRequestRepository.createQueryBuilder()
      .update()
      .set({ status: "accepted" })
      .where("sender = :sender_id", sender_id)
      .andWhere("receiver = :receiver_id", receiver_id)
      .execute();
    const friends = FriendsRepository.create();
    friends.user1 = sender_id;
    friends.user2 = receiver_id;
    await FriendsRepository.save(friends);
    res.status(200).send({ message: "Friend request accepted" });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
};

const rejectFriendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { sender_id, receiver_id } = req.body;
  try {
    await FriendRequestRepository.createQueryBuilder()
      .update()
      .set({ status: "rejected" })
      .where("sender = :sender_id", sender_id)
      .andWhere("receiver = :receiver_id", receiver_id)
      .execute();
    res.status(200).send({ message: "Friend request rejected" });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
};

const getAllFriendRequests = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { status } = req.body;
  const userId = req.user.data.id;
  try {
    const friendRequests = await FriendRequestRepository.find({
      where: {
        status,
        receiver: {
          id: userId,
        },
      },
    });
    res
      .status(200)
      .json({ message: "Successfully Get!", data: friendRequests });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
};

const getAllFriends = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user.data.id;
  try {
    const friends = await FriendsRepository.find({
      where: [{ user1: { id: userId } }, { user2: { id: userId } }],
      relations: {
        user1: true,
        user2: true,
      },
    });
    const friendDetails = friends.map((friend) => {
      return friend.user1.id === userId ? friend.user2 : friend.user1;
    });
    res.status(200).json({ message: "Successfully Get!", data: friendDetails });
  } catch (error) {
    console.log(error);

    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
};

const checkIfFriend = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user.data.id;
  const { friendId } = req.params;

  try {
    const friendship = await FriendsRepository.findOne({
      where: [
        { user1: { id: userId }, user2: { id: friendId } },
        { user1: { id: friendId }, user2: { id: userId } },
      ],
    });

    if (friendship) {
      res
        .status(200)
        .json({ message: "Users are friends", data: { areFriends: true } });
    } else {
      res.status(200).json({
        message: "Users are not friends",
        data: { areFriends: false },
      });
    }
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
};

export default {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getAllFriendRequests,
  getAllFriends,
  checkIfFriend,
};
