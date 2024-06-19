import React, { useEffect } from "react";
import ProfileTop from "./helpers/ProfileTop";
import ProfileTabs from "./helpers/ProfileTabs/ProfileTabs";
import { Col, Row } from "antd";
import ProfileAbout from "./helpers/ProfileAbout/ProfileAbout";
import { getUserByIdApi } from "../../redux/api/User";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
const ProfileOther = () => {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    getUserByIdApi(dispatch, params.id);
  }, [params]);
  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} lg={24}>
          <ProfileTop />
        </Col>
        <Col xs={24} lg={10}>
          <ProfileAbout />
        </Col>
        <Col xs={24} lg={14}>
          <ProfileTabs />
        </Col>
      </Row>
    </div>
  );
};

export default ProfileOther;
