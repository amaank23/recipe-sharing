import React, { useEffect, useState } from "react";
import { getCommentsByPostIdApi } from "../../redux/api/Posts";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../utils/socket";

const PostComments = ({ postId, incrementComment }) => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (postId) {
      getCommentsByPostIdApi(dispatch, postId, (data) => {
        setComments(data.data);
      });
    }
  }, [postId]);
  function onNewComment(data) {
    setComments((prev) => {
      return [...prev, { ...data }];
    });
    incrementComment();
  }
  useEffect(() => {
    const listenerName = `new-comment-${postId}`;
    socket.on(listenerName, onNewComment);
    return () => {
      socket.off(listenerName, onNewComment);
    };
  }, []);
  return (
    <div className="mb-3 flex flex-col gap-2">
      {comments.map((item) => {
        return (
          <Comment key={item.id} comment={item.comment} user={item.user} />
        );
      })}
    </div>
  );
};

export default PostComments;

function Comment({ comment, user }) {
  return (
    <div className="flex gap-3 items-center">
      <div className="bg-black rounded-full w-[32px] h-[32px] overflow-hidden">
        <img
          src={user?.profile?.profileImgUrl || "https://placehold.co/32x32"}
          alt=""
        />
      </div>
      <div className="flex flex-col bg-[#F0F2F5] p-2 rounded-lg">
        <h4 className="font-medium">{`${user.firstName} ${user.lastName}`}</h4>
        <p>{comment}</p>
      </div>
    </div>
  );
}
