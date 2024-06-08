import { Col, Form, Input, Modal, Row } from "antd";
import React, { useState } from "react";
import { IoCloudUpload } from "react-icons/io5";
import CustomButton from "../../../components/Button/CustomButton";
import { RxCross1 } from "react-icons/rx";

const EditProfileModal = ({ open, close }) => {
  const [photos, setPhotos] = useState({
    cover: { preview: null, file: null },
    profile: { preview: null, file: null },
  });
  function onImagesUpload(e, type) {
    const files = e.target.files;
    for (const file of files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prev) => ({
          ...prev,
          [type]: { file: files[0], preview: reader.result },
        }));
      };
      reader.readAsDataURL(file);
    }
  }
  function onFinish(values) {
    const formData = new FormData();
    if (values.city) {
      formData.append("city", values.city);
    }
    if (values.country) {
      formData.append("country", values.country);
    }
    if (values.about) {
      formData.append("about", values.about);
    }
    if (photos.profile.file) {
      formData.append("profileImage", photos.profile.file);
    }
    if (photos.cover.file) {
      formData.append("coverImage", photos.cover.file);
    }
    // call api
  }
  return (
    <Modal title="Edit Profile" open={open} onCancel={close} footer={null}>
      <Form onFinish={onFinish}>
        <div className="mb-[1rem] py-4 relative bg-white rounded-xl ">
          <Row gutter={16}>
            <Col xs={24}>
              <div className="cursor-pointer relative overflow-hidden w-[200px] h-[200px] rounded-full border border-borderColor flex justify-center items-center mx-auto">
                <input
                  type="file"
                  hidden
                  id="profile-pic"
                  className="!hidden"
                  onChange={(e) => onImagesUpload(e, "profile")}
                />

                <label
                  htmlFor="profile-pic"
                  className="w-full h-full flex justify-center items-center cursor-pointer"
                >
                  {photos.profile.preview ? (
                    <>
                      <img
                        src={photos.profile.preview}
                        className="w-full h-full"
                        alt=""
                      />
                    </>
                  ) : (
                    <span className="flex flex-col items-center ">
                      <IoCloudUpload size={28} />
                      Upload Profile Picture
                    </span>
                  )}
                </label>
              </div>
            </Col>
            <Col xs={24} className="mt-5">
              <div className="rounded-lg border h-[145px] border-borderColor flex justify-center items-center mx-auto">
                <input
                  type="file"
                  hidden
                  id="cover-pic"
                  className="!hidden"
                  onChange={(e) => onImagesUpload(e, "cover")}
                />
                <label
                  htmlFor="cover-pic"
                  className="w-full h-full flex justify-center items-center cursor-pointer"
                >
                  {photos.cover.preview ? (
                    <>
                      <img
                        src={photos.cover.preview}
                        className="w-full h-full"
                        alt=""
                      />
                    </>
                  ) : (
                    <span className="flex flex-col items-center ">
                      <IoCloudUpload size={28} />
                      Upload Cover Picture
                    </span>
                  )}
                </label>
              </div>
            </Col>
            <Col xs={24} className="mt-5">
              <label htmlFor="about">About</label>
              <Form.Item name={"about"}>
                <Input.TextArea
                  name={"about"}
                  id="about"
                  placeholder={"About..."}
                  className="h-[41px] mt-2"
                  rows={3}
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <label htmlFor="city">City</label>
              <Form.Item name={"city"}>
                <Input
                  name={"city"}
                  id="city"
                  placeholder={"Enter City Name"}
                  className="h-[41px] mt-2"
                />
              </Form.Item>
            </Col>
            <Col xs={24} className="mt-5">
              <label htmlFor="country">Country</label>
              <Form.Item name={"coountry"}>
                <Input
                  name={"country"}
                  id="country"
                  placeholder={"Enter Country Name"}
                  className="h-[41px] mt-2"
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div>
          <CustomButton htmlType="submit">Update</CustomButton>
        </div>
      </Form>
    </Modal>
  );
};

export default EditProfileModal;
