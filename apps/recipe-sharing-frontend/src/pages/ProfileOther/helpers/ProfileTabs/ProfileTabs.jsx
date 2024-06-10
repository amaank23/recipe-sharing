import { Tabs } from "antd";
import React from "react";
import PostTab from "./helpers/PostTab";
import RecipesTab from "./helpers/RecipesTab";

const ProfileTabs = () => {
  const items = [
    {
      key: "1",
      label: "Posts",
      children: <PostTab />,
    },
    // {
    //   key: "2",
    //   label: "Recipes",
    //   children: <RecipesTab />,
    // },
  ];
  const renderTabBar = (props, DefaultTabBar) => (
    <div className=" mb-[1rem] relative bg-white rounded-xl">
      <DefaultTabBar {...props} />
    </div>
  );
  return (
    <Tabs
      defaultActiveKey="1"
      items={items}
      renderTabBar={renderTabBar}
      centered
    />
  );
};

export default ProfileTabs;
