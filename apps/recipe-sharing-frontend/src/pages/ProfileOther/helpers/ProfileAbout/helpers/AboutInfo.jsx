import LocIcon from "../../../../../assets/loc.png";
import HeartIcon from "../../../../../assets/heart.png";
import CalenderIcon from "../../../../../assets/calender.png";
import EarthIcon from "../../../../../assets/earth.png";
import WorkIcon from "../../../../../assets/work.png";
import AboutInfoSingle from "./AboutInfoSingle";
const AboutInfo = ({ city, country, joinedDate, email }) => {
  return (
    <div className="flex flex-col gap-5">
      {(city || country) && (
        <AboutInfoSingle
          icon={LocIcon}
          label={`${city || ""}${`, ${country || ""}`}`}
        />
      )}
      {joinedDate && (
        <AboutInfoSingle icon={CalenderIcon} label={`Joined ${joinedDate}`} />
      )}
      {email && <AboutInfoSingle icon={EarthIcon} label={email} />}
    </div>
  );
};

export default AboutInfo;
