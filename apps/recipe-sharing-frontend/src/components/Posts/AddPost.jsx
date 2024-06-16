import React from "react";
import UserIcon from "./../../assets/user-1.png";
import ImageUploadIcon from "./../../assets/image-upload-icon.png";
import AddPostModal from "./AddPostModal";
import { useToggle } from "./../../utils/hooks/useToggle";
const AddPost = () => {
  const [open, toggle] = useToggle();
  return (
    <>
      {open && <AddPostModal open={open} close={toggle} />}
      <div
        className="mb-[1rem] p-4 relative bg-white rounded-xl cursor-pointer"
        onClick={toggle}
      >
        <div className="flex items-center gap-4">
          <div className="w-[36px] h-[36px] overflow-hidden rounded-full">
            <img src={UserIcon} className="w-[36px] h-[36px] object-cover" />
          </div>
          <input
            type="text"
            placeholder="Post something..."
            className="flex-grow focus-visible:outline-none cursor-pointer"
            value={""}
            readOnly
          />
          <label htmlFor="postImages">
            <img src={ImageUploadIcon} className="cursor-pointer" />
          </label>
        </div>
      </div>
    </>
  );
};

export default AddPost;
