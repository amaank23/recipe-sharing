import dayjs from "dayjs";
import UserIcon from "./../../assets/user-1.png";
import { useNavigate } from "react-router-dom";
import { getFromStorage } from "../../utils/storage";

const PostUser = ({ user, createdAt }) => {
  const navigate = useNavigate();
  const loggedInUser = getFromStorage("user");
  function onUserClick() {
    if (user.id !== loggedInUser.id) {
      navigate(`/profile/${user.id}`);
    }
  }
  return (
    <div className="flex justify-between items-start">
      <div
        className="flex gap-4 items-center cursor-pointer"
        onClick={onUserClick}
      >
        <div className="w-[42px] h-[42px] overflow-hidden rounded-full">
          <img
            src={user?.profile?.profileImgUrl || "https://placehold.co/42x42"}
            className="w-[42px] h-[42px] object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-sm text-[#2D3139] font-semibold">{`${user.firstName} ${user.lastName}`}</h2>
          <p className="text-[#92929D] text-xs">
            {`${dayjs(createdAt).format("DD MMMM")} at ${dayjs(
              createdAt
            ).format("h:mm A")}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostUser;
