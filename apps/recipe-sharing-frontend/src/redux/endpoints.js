export default {
  Auth: {
    login: "auth/login",
    register: "auth/register",
    otpVerification: "auth/verify-otp",
  },
  Posts: {
    addPost: "posts",
    getAllPost: "posts",
    likeUnlikePost: (postId) => `posts/${postId}/likes`,
    commentOnPost: (postId) => `posts/${postId}/comments`,
  },
};
