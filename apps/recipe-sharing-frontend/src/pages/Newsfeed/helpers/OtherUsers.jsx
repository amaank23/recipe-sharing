import React, { useEffect } from "react";
import { getAllUsersApi } from "../../../redux/api/User";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../../components/Button/CustomButton";
import { useNavigate } from "react-router-dom";

const OtherUsers = () => {
  const dispatch = useDispatch();
  const getAllUsers = useSelector((state) => state.getAllUsers);
  const navigate = useNavigate();
  useEffect(() => {
    getAllUsersApi(dispatch);
  }, []);
  function navigateToProfile(userId) {
    navigate(`/profile/${userId}`);
  }
  return (
    <div className="px-10 py-6 bg-white my-2 h-[85vh] sticky top-0 left-0 overflow-y-auto">
      {getAllUsers.data?.data?.length && (
        <>
          {getAllUsers.data?.data?.map((item) => (
            <div className="flex flex-col gap-3 items-center">
              <div
                className="w-[120px] h-[120px] bg-black rounded-full overflow-hidden cursor-pointer"
                onClick={() => navigateToProfile(item.id)}
              >
                <img src={item?.profile?.profileImgUrl} alt="" />
              </div>
              <h4
                className="text-xl font-medium cursor-pointer"
                onClick={() => navigateToProfile(item.id)}
              >{`${item.firstName} ${item.lastName}`}</h4>
              <CustomButton className="!text-[16px] !h-[41px]">
                Add to Friends
              </CustomButton>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default OtherUsers;
