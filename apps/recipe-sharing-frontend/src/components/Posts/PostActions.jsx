import { useState } from "react";
import { likeUnlikePostApi } from "../../redux/api/Posts";
import CommentIcon from "./../../assets/comment-icon.png";
import LikesIcon from "./../../assets/like-icon.png";
import ShareIcon from "./../../assets/share-icon.png";
import { useDispatch } from "react-redux";
const PostActions = ({
  commentsCount,
  likesCount,
  postId,
  isThisPostLiked,
  toggleComments,
}) => {
  const [isPostLiked, setIsPostLiked] = useState(isThisPostLiked);
  const [likes, setLikes] = useState(likesCount);
  const dispatch = useDispatch();
  function onLikeClick() {
    likeUnlikePostApi(dispatch, postId, (data) => {
      setIsPostLiked((prev) => !prev);
      setLikes((prev) => {
        if (data.action === "like") {
          return prev + 1;
        } else {
          return prev - 1;
        }
      });
    });
  }
  return (
    <div className="flex justify-between items-center">
      <LikeBtn
        onClick={onLikeClick}
        likesCount={likes}
        isPostLiked={isPostLiked}
      />
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={toggleComments}
      >
        <img src={CommentIcon} />
        <span className="text-[#9D9DAF] text-sm">{commentsCount} Comments</span>
      </div>
    </div>
  );
};

export default PostActions;

function LikeBtn({ onClick, likesCount, isPostLiked }) {
  return (
    <div
      className={`flex items-center gap-3 cursor-pointer ${
        isPostLiked ? "sepia" : ""
      }`}
      onClick={onClick}
    >
      <img src={LikesIcon} />
      <span className="text-[#9D9DAF] text-sm">{likesCount} Likes</span>
    </div>
  );
}
