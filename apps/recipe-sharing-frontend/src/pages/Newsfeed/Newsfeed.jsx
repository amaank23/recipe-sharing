import { Col, Row } from "antd";
import React from "react";
import OtherUsers from "./helpers/OtherUsers";

const Newsfeed = () => {
  return (
    <Row gutter={16}>
      <Col xs={24} lg={10}>
        <OtherUsers />
      </Col>
      <Col xs={24} lg={14}></Col>
    </Row>
  );
};

export default Newsfeed;
