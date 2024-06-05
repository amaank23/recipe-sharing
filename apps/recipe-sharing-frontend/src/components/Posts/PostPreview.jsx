import PostUser from "./PostUser";
import PostContent from "./PostContent";
import { PropTypes } from "prop-types";

const PostPreview = ({ text, images }) => {
  return (
    <div className="bg-white p-4 rounded-xl mb-4">
      <PostUser />
      <PostContent text={text} images={images} />
    </div>
  );
};

PostPreview.propTypes = {
  text: PropTypes.string.isRequired,
  images: PropTypes.array,
};

export default PostPreview;
