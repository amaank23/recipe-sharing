import PostUser from "./PostUser";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import { PropTypes } from "prop-types";
import { Divider } from "antd";
import PostsCommentAdd from "./PostsCommentAdd";
import { useState } from "react";
import PostComments from "./PostComments";

const Post = ({
  text,
  images,
  commentsCount,
  likesCount,
  postId,
  isThisPostLiked,
  user,
  createdAt,
}) => {
  const [isCommentOn, setIsCommentOn] = useState(false);
  const [commentCount, setCommentCount] = useState(commentsCount);
  function toggleComments() {
    setIsCommentOn((prev) => !prev);
  }
  function incrementComment() {
    setCommentCount((prev) => prev + 1);
  }
  return (
    <div className="bg-white p-4 rounded-xl mb-4">
      <PostUser user={user} createdAt={createdAt} />
      <PostContent text={text} images={images} />
      <Divider className="mb-4" />
      <PostActions
        commentsCount={commentCount}
        likesCount={likesCount}
        postId={postId}
        isThisPostLiked={isThisPostLiked}
        toggleComments={toggleComments}
      />
      <Divider className="mt-4" />
      {isCommentOn && (
        <>
          <PostComments postId={postId} />
          <PostsCommentAdd postId={postId} />
        </>
      )}
    </div>
  );
};

Post.propTypes = {
  text: PropTypes.string.isRequired,
  images: PropTypes.array,
};

export default Post;
