import { NextFunction, Request, Response } from "express";
import User from "../entities/User";
import { UserRepository } from "../repository/user.repository";
import { INVALID_USER } from "../utils/constants";
import CustomError from "../utils/error";
import { CustomRequest } from "../middlewares/authMiddleware";
import { ILike, Like, Not } from "typeorm";
import { FriendsRepository } from "../repository/friends.repository";
import { FriendRequestRepository } from "../repository/friendRequest.repository";
import { PostRepository } from "../repository/post.repository";

async function getUserById(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    let friendShipStatus = "";
    const loggedInUserId = req.user.data.id;
    const { id } = req.params;
    const user: User = await UserRepository.findOne({
      where: { id },
      relations: { profile: true },
    });
    const friendship = await FriendsRepository.findOne({
      where: [
        { user1: { id: id }, user2: { id: loggedInUserId } },
        { user1: { id: loggedInUserId }, user2: { id: id } },
      ],
    });
    if (friendship) {
      friendShipStatus = "friends";
    } else {
      const friendShipRequestLoggedInUserToId =
        await FriendRequestRepository.findOne({
          where: {
            sender: {
              id: loggedInUserId,
            },
            receiver: {
              id,
            },
          },
        });
      if (
        friendShipRequestLoggedInUserToId &&
        friendShipRequestLoggedInUserToId.status !== "rejected"
      ) {
        friendShipStatus = "requested-authUser-to-Id";
      } else {
        const friendShipRequestIdToLoggedInUser =
          await FriendRequestRepository.findOne({
            where: {
              sender: {
                id: id,
              },
              receiver: {
                id: loggedInUserId,
              },
            },
          });
        if (
          friendShipRequestIdToLoggedInUser &&
          friendShipRequestIdToLoggedInUser.status !== "rejected"
        ) {
          friendShipStatus = "requested-Id-to-authUser";
        } else {
          friendShipStatus = "not-friends";
        }
      }
    }

    if (!user) {
      throw new CustomError(INVALID_USER, 400).errorInstance();
    }
    res
      .status(200)
      .json({ message: "Successfully Get", data: { user, friendShipStatus } });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
}

async function getAllUsers(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.data.id;
    const users: User[] = await UserRepository.find({
      where: { id: Not(userId) },
      relations: { profile: true },
    });
    res.status(200).json({ message: "Successfully Get", data: users });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
}

async function searchUsersPostsAndRecipe(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.data.id;
    const { query } = req.query;
    const querySearch = query as string;

    if (!querySearch) {
      throw new CustomError("Query parameter is required", 400).errorInstance();
    }

    let firstName = null;
    let lastName = null;
    const nameParts = querySearch.split(" ");
    if (nameParts.length > 1) {
      firstName = nameParts[0];
      lastName = nameParts.slice(1).join(" ");
    }

    // Fetch users matching the query
    const users = await UserRepository.find({
      where: [
        {
          firstName: ILike(`%${firstName}%`),
          lastName: ILike(`%${lastName}%`),
        },
        { firstName: ILike(`%${querySearch}%`) },
        { lastName: ILike(`%${querySearch}%`) },
      ],
    });

    // Fetch posts matching the query
    const posts = await PostRepository.createQueryBuilder("post")
      .where("post.content ILIKE :query", { query: `%${querySearch}%` })
      .leftJoinAndSelect("post.postImages", "postImages")
      .loadRelationCountAndMap("post.commentsCount", "post.postComments")
      .loadRelationCountAndMap("post.likesCount", "post.postLikes")
      .leftJoinAndSelect(
        "post.postLikes",
        "postLikes",
        "postLikes.userId = :userId",
        { userId }
      )
      .leftJoinAndSelect("post.user", "user")
      .leftJoinAndSelect("user.profile", "userProfile")
      .leftJoinAndSelect("post.recipe", "postRecipe")
      .leftJoinAndSelect("postRecipe.ingredients", "recipeIngredients")
      .orderBy("post.created_at", "DESC")
      .getMany();

    res
      .status(200)
      .json({ message: "Successfully Get", data: { posts, users } });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
}

export default { getAllUsers, getUserById, searchUsersPostsAndRecipe };
