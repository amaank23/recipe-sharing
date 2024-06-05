import AboutContent from "./helpers/AboutContent";
import AboutInfo from "./helpers/AboutInfo";
import AboutStats from "./helpers/AboutStats";
const ProfileAbout = () => {
  return (
    <div className="bg-white p-4 rounded-xl mb-4">
      <AboutContent />
      <AboutStats />
      <AboutInfo />
    </div>
  );
};

export default ProfileAbout;
