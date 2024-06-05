import UserIcon from "./../../assets/user-1.png";
import ImageUploadIcon from "./../../assets/upload.png";
import AttachIcon from "./../../assets/attach.png";
import Emojicon from "./../../assets/emoji.png";

const PostsCommentAdd = () => {
  return (
    <div className="bg-white">
      <div className="flex items-center gap-4">
        <div className="w-[36px] h-[36px] overflow-hidden rounded-full">
          <img src={UserIcon} className="w-[36px] h-[36px] object-cover" />
        </div>
        <div className="flex-grow relative">
          <input
            type="text"
            placeholder="Write your comment "
            className="w-full focus-visible:outline-none bg-[#F4F5F7] h-[46px] p-3"
          />
          <div className="absolute z-10 right-3 top-[50%] -translate-y-2/4 flex gap-4 items-center">
            <img src={AttachIcon} className="cursor-pointer" />
            <img src={Emojicon} className="cursor-pointer" />
            <img src={ImageUploadIcon} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsCommentAdd;
