import { useEffect, useState } from "react";
import { useListen } from "../../../../../utils/hooks/useListen";
import { getFromStorage, setInStorage } from "../../../../../utils/storage";
import { setUser } from "../../../../../redux/slices/Auth/authSlice";
import { useDispatch } from "react-redux";

const AboutStats = ({ post, recipe, friends }) => {
  return (
    <div className="grid grid-cols-3 mb-4">
      <div className="flex flex-col gap-2">
        <h4 className="text-sm text-center text-[#9D9DAF]">Posts</h4>
        <span className="font-semibold text-[#2D3139] text-center">{post}</span>
      </div>
      <div className="flex flex-col gap-2 border-l border-r border-[#E2E2E2]">
        <h4 className="text-sm text-center text-[#9D9DAF]">Recipes</h4>
        <span className="font-semibold text-[#2D3139] text-center">
          {recipe}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-sm text-center text-[#9D9DAF]">Friends</h4>
        <span className="font-semibold text-[#2D3139] text-center">
          {friends}
        </span>
      </div>
    </div>
  );
};

export default AboutStats;
