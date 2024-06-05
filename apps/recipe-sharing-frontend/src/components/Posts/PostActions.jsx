import CommentIcon from "./../../assets/comment-icon.png";
import LikesIcon from "./../../assets/like-icon.png";
import ShareIcon from "./../../assets/share-icon.png";
const PostActions = ({ commentsCount, likesCount }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3 cursor-pointer">
        <img src={CommentIcon} />
        <span className="text-[#9D9DAF] text-sm">{commentsCount} Comments</span>
      </div>
      <div className="flex items-center gap-3 cursor-pointer">
        <img src={LikesIcon} />
        <span className="text-[#9D9DAF] text-sm">{likesCount} Likes</span>
      </div>
      <div className="flex items-center gap-3 cursor-pointer">
        <img src={ShareIcon} />
        <span className="text-[#9D9DAF] text-sm">Share</span>
      </div>
    </div>
  );
};

export default PostActions;
