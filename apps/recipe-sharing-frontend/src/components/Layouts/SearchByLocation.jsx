import React, { useState, useRef, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import LocIcon from "./../../assets/location-icon.png";
import { getSearchResultsApi } from "../../redux/api/User";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFromStorage } from "../../utils/storage";

const SearchByLocation = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const inputRef = useRef(null);
  const loggedInUser = getFromStorage("user");
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const getSearchResults = useSelector((state) => state.getSearchResults);
  const dispatch = useDispatch();
  const timeRef = useRef();
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      inputRef.current &&
      !inputRef.current.contains(event.target)
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  function onInputChange(e) {
    clearTimeout(timeRef.current);
    timeRef.current = setTimeout(() => {
      getSearchResultsApi(dispatch, e.target.value);
    }, 500);
  }
  function onUserClick(userId) {
    if (userId !== loggedInUser.id) {
      navigate(`/profile/${userId}`);
    } else {
      navigate(`/profile`);
    }
    setDropdownVisible(false);
  }
  return (
    <div className="flex relative">
      <div
        ref={inputRef}
        className="bg-[#E2E2EA] rounded-[40px] flex gap-2 px-4 h-[38px] w-[250px]"
        onClick={() => setDropdownVisible(true)}
      >
        <SearchOutlined />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent focus-visible:outline-none"
          onFocus={() => setDropdownVisible(true)}
          onChange={onInputChange}
        />
      </div>
      {dropdownVisible && (
        <div
          ref={dropdownRef}
          className="absolute w-full h-[200px] bg-white top-[100%] shadow-xl z-10 rounded-md flex flex-col px-4 py-4 gap-4 overflow-y-auto"
        >
          {getSearchResults?.data?.data?.users?.map((item) => {
            return (
              <div
                className="flex items-center gap-2  cursor-pointer"
                onClick={() => onUserClick(item.id)}
              >
                <div className="w-[42px] h-[42px] rounded-full overflow-hidden bg-black">
                  <img
                    src={
                      item.profile.profileImgUrl || "https://placehold.co/42x42"
                    }
                    alt=""
                    className="object-contain w-[42px] h-[42px]"
                  />
                </div>
                <h4>{`${item.firstName} ${item.lastName}`}</h4>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchByLocation;

function GetSearchResults() {}
