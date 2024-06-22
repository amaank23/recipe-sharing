import React, { useState } from "react";
import ChatIcon from "./../../assets/chat-icon.png";
import Chatbox from "./Chatbox";
import { useSelector } from "react-redux";

const Chat = () => {
  const [isChatBoxOpened, setIsChatBoxOpened] = useState(true);
  function toggleChatBox() {
    setIsChatBoxOpened((prev) => !prev);
  }

  return (
    <div className="fixed right-0 sm:right-10 bottom-10 z-[999]">
      <div
        onClick={toggleChatBox}
        className="w-[68px] h-[68px] rounded-full flex justify-center items-center cursor-pointer bg-primary"
      >
        <img src={ChatIcon} alt="" />
      </div>
      <Chatbox
        toggleChatBox={toggleChatBox}
        visible={isChatBoxOpened}
        color={"#fff"}
      />
    </div>
  );
};

export default Chat;
