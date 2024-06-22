import React, { useState } from "react";
import { Input } from "antd";
import { IoSend } from "react-icons/io5";
const ChatInput = ({ sendMessage }) => {
  const [message, setMessage] = useState("");
  function clearInput() {
    setMessage("");
  }
  return (
    <div className="relative flex">
      <Input
        placeholder="Send Message"
        className="bg-[#34405414] text-sm h-14 w-[85%] border-none"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        onPressEnter={() => sendMessage(message, clearInput)}
      />
      <div className="w-[15%] flex items-center justify-center bg-[#34405414]">
        <IoSend
          color="#F98866"
          className="cursor-pointer"
          size={"20"}
          onClick={() => sendMessage(message, clearInput)}
        />
      </div>
    </div>
  );
};

export default ChatInput;
