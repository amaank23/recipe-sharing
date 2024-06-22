import { nanoid } from "nanoid";
import React, { useEffect, useRef } from "react";
import { Spin } from "antd";
import { useSelector } from "react-redux";

const ChatMessages = ({ messages }) => {
  const scrollRef = useRef();
  // useEffect(() => {
  //     if(messages?.length <= 6){
  //         scrollRef?.current?.scrollIntoView({ behavior: "smooth" })
  //     }
  // }, [messages])
  // useEffect(() => {
  //     if(sendChatMessage?.data){
  //         scrollRef?.current?.scrollIntoView({ behavior: "smooth" })
  //     }
  // }, [sendChatMessage?.data])
  return (
    <div>
      <div className="h-full flex flex-col gap-3 mt-3 chat">
        <Spin className="text-black" />

        {messages.map((item) => {
          return (
            <div
              style={
                item.sendBy === "PublicUser"
                  ? {
                      backgroundColor: "#b7b5b542",
                      padding: "0.63rem",
                      maxWidth: 255,
                      borderRadius: 8,
                      marginLeft: "auto",
                      marginRight: "0.5rem",
                      wordWrap: "break-word",
                    }
                  : {
                      backgroundColor: "#b7b5b542",
                      padding: "0.63rem",
                      maxWidth: 255,
                      borderRadius: 8,
                      wordWrap: "break-word",
                    }
              }
              key={nanoid()}
            >
              <p style={{ fontSize: "0.75rem" }}>{item?.message}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatMessages;
