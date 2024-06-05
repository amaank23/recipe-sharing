import UserIcon from "./../../assets/user-1.png";

const PostUser = () => {
  return (
    <div className="flex justify-between items-start">
      <div className="flex gap-4 items-center">
        <div className="w-[42px] h-[42px] overflow-hidden rounded-full">
          <img src={UserIcon} className="w-[42px] h-[42px] object-cover" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-sm text-[#2D3139] font-semibold">Aman khan</h2>
          <p className="text-[#92929D] text-xs">12 April at 09.28 PM</p>
        </div>
      </div>
    </div>
  );
};

export default PostUser;
