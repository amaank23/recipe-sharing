import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddPost from "../../../components/Posts/AddPost";
import { getAllFriendsPostsApi } from "../../../redux/api/Posts";
import Post from "../../../components/Posts/Post";

const Posts = () => {
  const [pageLimit, setPageLimit] = useState({
    page: 1,
    limit: 999,
  });
  const dispatch = useDispatch();
  const getAllFriendsPosts = useSelector((state) => state.getAllFriendsPosts);
  useEffect(() => {
    getAllFriendsPostsApi(dispatch, pageLimit);
  }, []);
  return (
    <div className="my-4">
      {/* <AddPost /> */}
      {getAllFriendsPosts?.data?.data?.length > 0 &&
        getAllFriendsPosts?.data?.data.map((item) => {
          return (
            <Post
              text={item.content || ""}
              images={item.postImages.map((item) => item.url)}
              commentsCount={item.commentsCount}
              likesCount={item.likesCount}
              postId={item.id}
              isThisPostLiked={item.postLikes?.length > 0}
              user={item.user}
              createdAt={item.created_at}
              recipe={item.recipe}
            />
          );
        })}
    </div>
  );
};

export default Posts;
