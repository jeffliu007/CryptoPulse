import React from "react";
import { Space, Spin } from "antd";

const Loader = () => {
  return (
    <div className="loader-container">
      <Space size="large">
        <Spin size="large" />
      </Space>
    </div>
  );
};

export default Loader;
