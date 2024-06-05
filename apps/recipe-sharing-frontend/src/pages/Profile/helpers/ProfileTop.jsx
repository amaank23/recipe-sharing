import React from "react";
import EditIcon from "./../../../assets/edit-icon.png";
const ProfileTop = () => {
  return (
    <div className="mt-3 mb-6 relative bg-white rounded-xl">
      <div className="h-[206px] 2xl:h-[306px] rounded-t-xl overflow-hidden bg-slate-500">
        {/* <img
      src={CoverImg}
      alt=""
      className="w-full h-[206px] 2xl:h-[306px] object-cover"
    /> */}
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-end -translate-y-16 w-full">
        <div className="flex gap-3 items-end ml-4">
          <div className="rounded-full overflow-hidden w-[156px] h-[156px] border-[10px] border-white bg-black">
            {/* <img src={UserImg} alt="" className="object-cover" /> */}
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl text-[#2D3139 font-semibold">Aman Khan</h2>
          </div>
        </div>
        <div className=" mr-4">
          <button className="text-white bg-[#F85F35] border border-[#F85F35] hover:bg-[#f85f35c8] transition-all rounded-lg flex gap-1 py-[10px] px-4 items-center">
            <img src={EditIcon} /> Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTop;
