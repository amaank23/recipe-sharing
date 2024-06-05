import LocIcon from "../../../../../assets/loc.png";
import HeartIcon from "../../../../../assets/heart.png";
import CalenderIcon from "../../../../../assets/calender.png";
import EarthIcon from "../../../../../assets/earth.png";
import WorkIcon from "../../../../../assets/work.png";
import AboutInfoSingle from "./AboutInfoSingle";
const AboutInfo = () => {
  return (
    <div className="flex flex-col gap-5">
      <AboutInfoSingle icon={LocIcon} label={"Yogyakarta, ID"} />
      <AboutInfoSingle icon={HeartIcon} label={"Single"} />
      <AboutInfoSingle icon={CalenderIcon} label={"Joined June 2012"} />
      <AboutInfoSingle icon={EarthIcon} label={"amaanwaseem24@gmail.com"} />
      <AboutInfoSingle icon={WorkIcon} label={"Working at Sebo Studio"} />
    </div>
  );
};

export default AboutInfo;
