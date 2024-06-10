import { useSelector } from "react-redux";
import AboutContent from "./helpers/AboutContent";
import AboutInfo from "./helpers/AboutInfo";
import AboutStats from "./helpers/AboutStats";
import dayjs from "dayjs";
const ProfileAbout = () => {
  const getUserById = useSelector((state) => state.getUserById);
  const data = getUserById.data?.data;
  return (
    <div className="bg-white p-4 rounded-xl mb-4">
      <AboutContent about={data?.user?.profile?.about || "."} />
      <AboutStats
        post={data?.user?.profile?.postsCount}
        recipe={data?.user?.profile?.recipesCount}
        friends={data?.user?.profile?.friendsCount}
        userId={data?.user?.id}
      />
      <AboutInfo
        city={data?.user?.profile?.city}
        country={data?.user?.profile?.country}
        email={data?.user?.email}
        joinedDate={dayjs(data?.user?.createdAt).format("MMMM DD")}
      />
    </div>
  );
};

export default ProfileAbout;
