import PostUser from "./PostUser";
import PostContent from "./PostContent";
import { PropTypes } from "prop-types";
import { getFromStorage } from "../../utils/storage";

const PostPreview = ({ text, images }) => {
  const user = getFromStorage("user");
  return (
    <div className="bg-white p-4 rounded-xl mb-4">
      <PostUser user={user} createdAt={Date.now()} />
      <PostContent text={text} images={images} />
    </div>
  );
};

PostPreview.propTypes = {
  text: PropTypes.string.isRequired,
  images: PropTypes.array,
};

export default PostPreview;
