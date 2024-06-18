import { Col, Row } from "antd";
import React from "react";
import OtherUsers from "./helpers/OtherUsers";
import Posts from "./helpers/Posts";

const Newsfeed = () => {
  return (
    <Row gutter={16}>
      <Col xs={24} lg={4}>
        {/* <OtherUsers /> */}
      </Col>
      <Col xs={24} lg={16}>
        <Posts />
      </Col>
    </Row>
  );
};

export default Newsfeed;
