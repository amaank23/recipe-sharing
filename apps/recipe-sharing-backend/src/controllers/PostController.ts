import { NextFunction, Response } from "express";
import { PostImagesRepository } from "../repository/postImages.repository";
import Post from "../entities/Post";
import { PostRepository } from "../repository/post.repository";
import CustomError from "../utils/error";
import { CustomRequest } from "../middlewares/authMiddleware";
import { PostLikesRepository } from "../repository/postLikes.repository";
import PostLikes from "../entities/PostLikes";
import { PostCommentsRepository } from "../repository/postComments.repository";

async function create(req: CustomRequest, res: Response, next: NextFunction) {
  try {
    let postImages = [];
    const post: Post = PostRepository.create();
    post.user = req.user.data.id;

    if ("postContent" in req.body) {
      post.content = req.body.postContent;
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
      return res.status(200).json({ message: "Post UnLiked Successfully" });
    } else {
      // add a new like
      await PostLikesRepository.createQueryBuilder("postLikes")
        .insert()
        .values({
          post: () => "'" + postId + "'",
          user: () => "'" + userId + "'",
        })
        .execute();
      res.status(201).json({ message: "Post Liked Successfully" });
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
    });
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
      .orderBy("created_at", "DESC")
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

export default { create, getAll, addLikeToPost, addComment, getAllComments };
