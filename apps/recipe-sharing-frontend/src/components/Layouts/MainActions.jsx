import UserIconAndDropdown from "./UserIconAndDropdown";
import BellIcon from "./../../assets/bell-icon.png";
import MsgIcon from "./../../assets/inbox-ixon.png";
import PlusIcon from "./../../assets/plus-icon.png";
const MainActions = () => {
  return (
    <div className="flex gap-3">
      <div className="bg-[#F4F5F7] flex justify-center items-center w-10 h-10 rounded-full cursor-pointer">
        <img src={BellIcon} alt="" />
      </div>
      <div className="bg-[#F4F5F7] flex justify-center items-center w-10 h-10 rounded-full cursor-pointer">
        <img src={MsgIcon} alt="" />
      </div>
      <div className="bg-[#F4F5F7] flex justify-center items-center w-10 h-10 rounded-full cursor-pointer">
        <img src={PlusIcon} alt="" />
      </div>
      <UserIconAndDropdown />
    </div>
  );
};

export default MainActions;
