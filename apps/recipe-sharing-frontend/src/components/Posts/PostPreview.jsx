import PostUser from "./PostUser";
import PostContent from "./PostContent";
import { PropTypes } from "prop-types";
import { getFromStorage } from "../../utils/storage";

const PostPreview = ({ text, images, recipe }) => {
  const user = getFromStorage("user");
  console.log(recipe);
  return (
    <div className="bg-white p-4 rounded-xl mb-4">
      <PostUser user={user} createdAt={Date.now()} />
      <PostContent text={text} images={images} recipe={recipe} />
    </div>
  );
};

PostPreview.propTypes = {
  text: PropTypes.string.isRequired,
  images: PropTypes.array,
};

export default PostPreview;
