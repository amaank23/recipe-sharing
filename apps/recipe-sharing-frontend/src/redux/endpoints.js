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
    getAllFriendsPosts: "posts/friends",
  },
  Profile: {
    EditProfile: (profileId) => `profiles/${profileId}`,
  },
  Users: {
    getAllUsers: "users",
    getUserById: (userId) => `users/${userId}`,
    getSearchResults: "users/search",
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
