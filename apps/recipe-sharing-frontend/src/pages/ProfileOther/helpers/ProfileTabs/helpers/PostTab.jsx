import React, { useEffect, useState } from "react";
import AddPost from "../../../../../components/Posts/AddPost";
import { getAllPostsByIdApi } from "../../../../../redux/api/Posts";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../../../../components/Posts/Post";
import { useParams } from "react-router-dom";

const PostTab = () => {
  const [pageLimit, setPageLimit] = useState({
    page: 1,
    limit: 999,
  });

  const params = useParams();
  const EditProfile = useSelector((state) => state.EditProfile);
  const dispatch = useDispatch();
  const getAllPostsById = useSelector((state) => state.getAllPostsById);
  const addPost = useSelector((state) => state.addPost);
  useEffect(() => {
    getAllPostsByIdApi(dispatch, pageLimit, params.id);
  }, [addPost.data, EditProfile?.data, params]);
  return (
    <>
      {getAllPostsById?.data?.data?.length > 0 &&
        getAllPostsById?.data?.data.map((item) => {
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
