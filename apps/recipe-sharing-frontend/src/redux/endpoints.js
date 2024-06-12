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
    getAllPostsById: (userId) => `posts/users/${userId}`,
  },
  Profile: {
    EditProfile: (profileId) => `profiles/${profileId}`,
  },
  Users: {
    getAllUsers: "users",
    getUserById: (userId) => `users/${userId}`,
  },
  Friends: {
    sendFriendRequest: "friends/request",
    acceptFriendRequest: "friends/accept",
  },
  Recipe: {
    getAllRecipes: "recipes",
    addRecipe: "recipes",
  },
};
