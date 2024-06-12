import { Checkbox, Modal } from "antd";
import React, { useState } from "react";
import UserIcon from "./../../assets/user-1.png";
import ImageUploadIcon from "./../../assets/image-upload-icon.png";
import PostPreview from "./PostPreview";
import CustomButton from "../Button/CustomButton";
import { addPostApi } from "../../redux/api/Posts";
import { useDispatch, useSelector } from "react-redux";
import RecipeSelect from "./RecipeSelect";
const AddPostModal = ({ open, close }) => {
  const [postType, setPostType] = useState("normal");
  const [post, setPost] = useState({
    content: "",
    postImages: [],
    imagesPreviews: [],
  });
  const addPost = useSelector((state) => state.addPost);
  const dispatch = useDispatch();
  function onPostContentChange(e) {
    setPost((prev) => ({ ...prev, content: e.target.value }));
  }
  function onImagesUpload(e) {
    const files = e.target.files;
    setPost((prev) => ({
      ...prev,
      postImages: [...files],
      imagesPreviews: [],
    }));

    for (const file of files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPost((prev) => ({
          ...prev,
          imagesPreviews: [...prev.imagesPreviews, reader.result],
        }));
      };
      reader.readAsDataURL(file);
    }
  }
  function handlePostCreate() {
    const formData = new FormData();
    if (post.content) {
      formData.append("postContent", post.content);
    }
    if (post.postImages.length) {
      for (const image of post.postImages) {
        formData.append("images", image);
      }
    }
    addPostApi(dispatch, formData, onSuccess);
  }
  function onSuccess() {
    setPost({
      content: "",
      imagesPreviews: [],
      postImages: [],
    });
    close();
  }
  return (
    <Modal title="Add Post" open={open} onCancel={close} footer={null}>
      <div className="mb-[1rem] py-4 relative bg-white rounded-xl cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="w-[36px] h-[36px] overflow-hidden rounded-full">
            <img src={UserIcon} className="w-[36px] h-[36px] object-cover" />
          </div>
          <input
            type="text"
            placeholder="Post something..."
            className="flex-grow focus-visible:outline-none"
            value={post.content}
            onChange={onPostContentChange}
          />
          <label htmlFor="postImages">
            <img src={ImageUploadIcon} className="cursor-pointer" />
          </label>
          <input
            id="postImages"
            type="file"
            multiple
            hidden
            onChange={onImagesUpload}
          />
        </div>
      </div>
      {postType === "recipe" && <RecipeSelect />}

      <div className="flex items-center mb-5 gap-2">
        <Checkbox
          id="shareRecipe"
          onClick={(e) => {
            if (e.target.checked) {
              setPostType("recipe");
            } else {
              setPostType("normal");
            }
          }}
        />
        <label htmlFor="shareRecipe" className="cursor-pointer">
          Share Recipe
        </label>
      </div>
      {post.content || post.postImages.length ? (
        <>
          <h4 className="text-center font-bold mb-6">Post Preview</h4>
          <PostPreview text={post.content} images={post.imagesPreviews} />
        </>
      ) : (
        ""
      )}
      <div>
        <CustomButton
          loading={addPost.loading}
          disabled={!post.content || post.postImages === 0}
          onClick={handlePostCreate}
        >
          Post
        </CustomButton>
      </div>
    </Modal>
  );
};

export default AddPostModal;
