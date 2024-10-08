import React from "react";
import EditIcon from "./../../../assets/edit-icon.png";
import { useToggle } from "../../../utils/hooks/useToggle";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
const ProfileTop = () => {
  const [open, toggle] = useToggle();
  const auth = useSelector((state) => state.auth);
  return (
    <div className="mt-3 mb-6 relative bg-white rounded-xl">
      {open && <EditProfileModal open={open} close={toggle} />}
      <div className="h-[206px] 2xl:h-[306px] rounded-t-xl overflow-hidden bg-slate-500">
        <img
          src={
            auth?.user?.profile?.coverImgUrl || "https://placehold.co/800x306"
          }
          alt=""
          className="w-full h-[206px] 2xl:h-[306px] object-cover"
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-end -translate-y-16 w-full">
        <div className="flex gap-3 items-end ml-4">
          <div className="rounded-full overflow-hidden w-[156px] h-[156px] border-[10px] border-white">
            <img
              src={
                auth?.user?.profile?.profileImgUrl ||
                "https://placehold.co/156x156"
              }
              alt=""
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl text-[#2D3139 font-semibold">
              {`${auth?.user?.firstName || ""} ${auth?.user?.lastName || ""}`}
            </h2>
          </div>
        </div>
        <div className=" mr-4">
          <button
            onClick={toggle}
            className="text-white bg-[#F85F35] border border-[#F85F35] hover:bg-[#f85f35c8] transition-all rounded-lg flex gap-1 py-[10px] px-4 items-center"
          >
            <img src={EditIcon} /> Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTop;
