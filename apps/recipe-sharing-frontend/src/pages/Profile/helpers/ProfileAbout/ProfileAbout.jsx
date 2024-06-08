import { useSelector } from "react-redux";
import AboutContent from "./helpers/AboutContent";
import AboutInfo from "./helpers/AboutInfo";
import AboutStats from "./helpers/AboutStats";
import dayjs from "dayjs";
const ProfileAbout = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <div className="bg-white p-4 rounded-xl mb-4">
      <AboutContent about={auth?.user?.profile?.about || "."} />
      <AboutStats
        post={auth?.user?.profile?.postsCount}
        recipe={auth?.user?.profile?.recipesCount}
        friends={auth?.user?.profile?.friendsCount}
        userId={auth?.user?.id}
      />
      <AboutInfo
        city={auth?.user?.profile?.city}
        country={auth?.user?.profile?.country}
        email={auth?.user?.email}
        joinedDate={dayjs(auth?.user?.createdAt).format("MMMM DD")}
      />
    </div>
  );
};

export default ProfileAbout;
