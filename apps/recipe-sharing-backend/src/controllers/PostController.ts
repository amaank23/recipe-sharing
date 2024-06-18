import { NextFunction, Response } from "express";
import { PostImagesRepository } from "../repository/postImages.repository";
import Post from "../entities/Post";
import { PostRepository } from "../repository/post.repository";
import CustomError from "../utils/error";
import { CustomRequest } from "../middlewares/authMiddleware";
import { PostLikesRepository } from "../repository/postLikes.repository";
import PostLikes from "../entities/PostLikes";
import { PostCommentsRepository } from "../repository/postComments.repository";
import { UserRepository } from "../repository/user.repository";
import { ProfileRepository } from "../repository/profile.repository";
import { RecipeRepository } from "../repository/recipe.repository";
import { FriendsRepository } from "../repository/friends.repository";

async function create(req: CustomRequest, res: Response, next: NextFunction) {
  try {
    let postImages = [];
    const post: Post = PostRepository.create();
    post.user = req.user.data.id;

    if ("postContent" in req.body) {
      post.content = req.body.postContent;
    }

    if ("recipeId" in req.body) {
      const recipe = await RecipeRepository.findOne({
        where: { id: req.body.recipeId },
      });
      post.recipe = recipe;
      post.postType = req.body.postType;
    }

    await PostRepository.save(post);

    if (req.files && "images" in req.files) {
      const files = await PostImagesRepository.uploadImages(
        req.files.images,
        post.id
      );
      if ("error" in files) {
        throw new CustomError(files.error, 500).errorInstance();
      }
      postImages = files;
    }
    const profile = await ProfileRepository.findOne({
      where: { user: { id: req.user.data.id } },
    });
    const newPostCount = profile.postsCount + 1;
    await ProfileRepository.update(
      { id: profile.id },
      { postsCount: newPostCount }
    );
    req.io.emit(`post-count-update-${req.user.data.id}`, newPostCount);
    res.status(201).json({
      message: "Post Successfully Created",
      data: { post, postImages },
    });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
}

async function getAll(req: CustomRequest, res: Response, next: NextFunction) {
  try {
    const { page, limit } = req.query;
    const itemsToSkip = (+page - 1) * +limit;
    const userId = req.user.data.id;
    const posts = await PostRepository.createQueryBuilder("post")
      .where("post.userId = :userId", { userId })
      .leftJoinAndSelect("post.postImages", "postImages")
      .loadRelationCountAndMap("post.commentsCount", "post.postComments")
      .loadRelationCountAndMap("post.likesCount", "post.postLikes")
      .leftJoinAndSelect(
        "post.postLikes",
        "postLikes",
        "postLikes.userId = :userId",
        { userId }
      )
      .leftJoinAndSelect("post.user", "User")
      .leftJoinAndSelect("User.profile", "UserProfile")
      .leftJoinAndSelect("post.recipe", "PostRecipe")
      .leftJoinAndSelect("PostRecipe.ingredients", "RecipeIngredients")
      .limit(+limit)
      .offset(itemsToSkip)
      .orderBy("post.created_at", "DESC")
      .getMany();
    res
      .status(200)
      .json({ data: posts, message: "Posts Successfully Retrieved" });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
}

async function getAllPostsById(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { page, limit } = req.query;
    const itemsToSkip = (+page - 1) * +limit;
    const userId = req.params.id;
    const loggedInUserId = req.user.data.id;
    const posts = await PostRepository.createQueryBuilder("post")
      .where("post.userId = :userId", { userId })
      .leftJoinAndSelect("post.postImages", "postImages")
      .loadRelationCountAndMap("post.commentsCount", "post.postComments")
      .loadRelationCountAndMap("post.likesCount", "post.postLikes")
      .leftJoinAndSelect(
        "post.postLikes",
        "postLikes",
        "postLikes.userId = :loggedInUserId",
        { loggedInUserId }
      )
      .leftJoinAndSelect("postLikes.user", "UserPostLikes")
      .leftJoinAndSelect("post.user", "User")
      .leftJoinAndSelect("User.profile", "UserProfile")
      .leftJoinAndSelect("post.recipe", "PostRecipe")
      .leftJoinAndSelect("PostRecipe.ingredients", "RecipeIngredients")
      .limit(+limit)
      .offset(itemsToSkip)
      .orderBy("post.created_at", "DESC")
      .getMany();
    res
      .status(200)
      .json({ data: posts, message: "Posts Successfully Retrieved" });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
}

async function addLikeToPost(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { postId } = req.params;
    const userId = req.user.data.id;

    // check if post exist
    const post = await PostRepository.createQueryBuilder("post")
      .where("post.id = :postId", { postId })
      .getOne();
    if (!post) {
      throw new CustomError(
        "Post with the assosiate id does not exist!",
        404
      ).errorInstance();
    }
    // check if like exist if it does remove like
    const postLike = await PostLikesRepository.createQueryBuilder("postLikes")
      .where("postLikes.postId = :postId", { postId })
      .andWhere("postLikes.userId = :userId", { userId })
      .getOne();

    if (postLike) {
      // delete a like
      await PostLikesRepository.createQueryBuilder("postLikes")
        .delete()
        .from(PostLikes)
        .where("id = :id", { id: postLike.id })
        .execute();
      return res.status(200).json({
        message: "Post UnLiked Successfully",
        data: { action: "unlike" },
      });
    } else {
      // add a new like
      await PostLikesRepository.createQueryBuilder("postLikes")
        .insert()
        .values({
          post: () => "'" + postId + "'",
          user: () => "'" + userId + "'",
        })
        .execute();
      res
        .status(201)
        .json({ message: "Post Liked Successfully", data: { action: "like" } });
    }
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
}

export async function addComment(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { postId } = req.params;
    const userId = req.user.data.id;
    const { comment } = req.body;
    const { io } = req;
    // check if post exist
    const post = await PostRepository.createQueryBuilder("post")
      .where("post.id = :postId", { postId })
      .getOne();
    if (!post) {
      throw new CustomError(
        "Post with the assosiate id does not exist!",
        404
      ).errorInstance();
    }

    // add new comment
    const newComment = await PostCommentsRepository.createQueryBuilder(
      "postComments"
    )
      .insert()
      .values({
        comment,
        post: () => "'" + postId + "'",
        user: () => "'" + userId + "'",
      })
      .execute();
    const newCommentId = newComment.identifiers[0].id;

    const newlyAddedComment = await PostCommentsRepository.findOne({
      where: { id: newCommentId },
      relations: { user: { profile: true } },
    });
    io.emit(`new-comment-${post.id}`, newlyAddedComment);
    res.status(201).json({
      message: "Comment Added Successfully!",
      comment: newlyAddedComment,
    });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
}

export async function getAllComments(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { postId } = req.params;
    const post = await PostRepository.createQueryBuilder("post")
      .where("post.id = :postId", { postId })
      .getOne();
    if (!post) {
      throw new CustomError(
        "Post with the assosiate id does not exist!",
        404
      ).errorInstance();
    }
    const comments = await PostCommentsRepository.createQueryBuilder(
      "postComments"
    )
      .where("postComments.postId = :postId", { postId })
      .leftJoinAndSelect("postComments.user", "User")
      .leftJoinAndSelect("User.profile", "Profile")
      .orderBy("postComments.created_at", "DESC")
      .getMany();
    res
      .status(200)
      .json({ message: "Comments Successfully Retrieved", data: comments });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
}

async function getAllFriendsPosts(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { page, limit } = req.query;
    const itemsToSkip = (+page - 1) * +limit;
    const userId = req.user.data.id;
    const friendsPosts = await PostRepository.createQueryBuilder("post")
      .leftJoinAndSelect("post.postImages", "postImages")
      .loadRelationCountAndMap("post.commentsCount", "post.postComments")
      .loadRelationCountAndMap("post.likesCount", "post.postLikes")
      .leftJoinAndSelect(
        "post.postLikes",
        "postLikes",
        "postLikes.userId = :loggedInUserId",
        { loggedInUserId: userId }
      )
      .leftJoinAndSelect("post.recipe", "Recipe")
      .leftJoinAndSelect("post.user", "User")
      .leftJoinAndSelect("User.profile", "UserProfile")
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select("friend.user2Id")
          .from("friend", "friend")
          .where("friend.user1Id = :userId")
          .getQuery();
        return `post.userId IN ${subQuery}`;
      })
      .setParameter("userId", userId)
      .orWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select("friend.user1Id")
          .from("friend", "friend")
          .where("friend.user2Id = :userId")
          .getQuery();
        return `post.userId IN ${subQuery}`;
      })
      .setParameter("userId", userId)
      .limit(+limit)
      .offset(itemsToSkip)
      .orderBy("post.created_at", "DESC")
      .getMany();

    res
      .status(200)
      .json({ message: "Posts Successfully Retrieved", data: friendsPosts });
  } catch (error) {
    console.log(error);

    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
}

export default {
  create,
  getAll,
  addLikeToPost,
  addComment,
  getAllComments,
  getAllPostsById,
  getAllFriendsPosts,
};
