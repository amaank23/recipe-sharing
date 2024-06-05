import React from "react";
import ProfileTop from "./helpers/ProfileTop";
import ProfileTabs from "./helpers/ProfileTabs/ProfileTabs";
import { Col, Row } from "antd";
import ProfileAbout from "./helpers/ProfileAbout/ProfileAbout";
const Profile = () => {
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

export default Profile;
