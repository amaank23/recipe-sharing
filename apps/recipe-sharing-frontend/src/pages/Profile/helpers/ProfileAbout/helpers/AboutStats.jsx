import { useEffect, useState } from "react";
import { useListen } from "../../../../../utils/hooks/useListen";
import { getFromStorage, setInStorage } from "../../../../../utils/storage";
import { setUser } from "../../../../../redux/slices/Auth/authSlice";
import { useDispatch } from "react-redux";

const AboutStats = ({ post, recipe, friends, userId }) => {
  const [counts, setCounts] = useState({
    post: post,
    recipe: recipe,
    friends: friends,
  });
  const dispatch = useDispatch();
  const [postCountUpdate] = useListen(`post-count-update-${userId}`);
  useEffect(() => {
    if (postCountUpdate) {
      setCounts((prev) => {
        return {
          ...prev,
          post: postCountUpdate,
        };
      });
      const user = getFromStorage("user");
      const updatedProfile = {
        ...user,
        profile: {
          ...user.profile,
          postsCount: postCountUpdate,
        },
      };
      setInStorage("user", updatedProfile);
      dispatch(setUser({ user: updatedProfile }));
    }
  }, [postCountUpdate]);
  return (
    <div className="grid grid-cols-3 mb-4">
      <div className="flex flex-col gap-2">
        <h4 className="text-sm text-center text-[#9D9DAF]">Posts</h4>
        <span className="font-semibold text-[#2D3139] text-center">
          {counts.post}
        </span>
      </div>
      <div className="flex flex-col gap-2 border-l border-r border-[#E2E2E2]">
        <h4 className="text-sm text-center text-[#9D9DAF]">Recipes</h4>
        <span className="font-semibold text-[#2D3139] text-center">
          {counts.recipe}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-sm text-center text-[#9D9DAF]">Friends</h4>
        <span className="font-semibold text-[#2D3139] text-center">
          {counts.friends}
        </span>
      </div>
    </div>
  );
};

export default AboutStats;
