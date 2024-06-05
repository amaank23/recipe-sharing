import { Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import LocIcon from "./../../assets/location-icon.png";

const SearchByLocation = () => {
  return (
    <div className="flex">
      <div className="bg-[#E2E2EA] rounded-[40px] flex gap-2 px-4 h-[38px] w-[250px]">
        <SearchOutlined />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent focus-visible:outline-none"
        />
      </div>
    </div>
  );
};

export default SearchByLocation;
