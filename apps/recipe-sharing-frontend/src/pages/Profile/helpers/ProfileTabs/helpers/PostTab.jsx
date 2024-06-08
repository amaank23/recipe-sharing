import React, { useEffect, useState } from "react";
import AddPost from "../../../../../components/Posts/AddPost";
import { getAllPostApi } from "../../../../../redux/api/Posts";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../../../../components/Posts/Post";

const PostTab = () => {
  const [pageLimit, setPageLimit] = useState({
    page: 1,
    limit: 999,
  });
  const dispatch = useDispatch();
  const getAllPost = useSelector((state) => state.getAllPost);
  const addPost = useSelector((state) => state.addPost);
  useEffect(() => {
    getAllPostApi(dispatch, pageLimit);
  }, [addPost.data]);
  return (
    <>
      <AddPost />
      {getAllPost?.data?.data?.length > 0 &&
        getAllPost?.data?.data.map((item) => {
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
            />
          );
        })}
    </>
  );
};

export default PostTab;
