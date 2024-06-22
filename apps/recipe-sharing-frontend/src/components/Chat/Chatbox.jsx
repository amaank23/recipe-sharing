import React, { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Input } from "antd";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { errorMessage } from "../../utils/message";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { socket } from "../../utils/socket";
import CustomButton from "../Button/CustomButton";

const Chatbox = ({ toggleChatBox, visible, color }) => {
  const containerRef = useRef();
  const [userCode, setUserCode] = useState("");
  const dispatch = useDispatch();
  const sendChatMessage = useSelector((state) => state.sendChatMessage);

  const chat = useSelector((state) => state.chat);
  const initiateChat = useSelector((state) => state.initiateChat);
  const [isInitiationSuccess, setInitiationSuccess] = useState(false);
  const [messages, setMessages] = useState([]);
  const [pageLimit, setPageLimit] = useState({
    page: 1,
    limit: 10,
  });

  function onSuccess() {
    setInitiationSuccess(true);
  }
  function onSuccessSendMessage(data) {
    // set Last Message to messages state array
    setMessages((prev) => [...prev, data]);
    const container = containerRef?.current;
    setTimeout(() => {
      container.scrollTo({
        top: container.scrollHeight - container.clientHeight,
        behavior: "smooth",
      });
    }, 300);
  }

  function sendMessage(message, clearInput) {
    if (!message) {
      errorMessage("Please Enter the Message");
      return;
    }
    const body = {
      publicConversationId: initiateChat?.data?.data?.id,
      userCode: userCode,
      message: message,
    };
    function onSuccessInputMessage(data) {
      onSuccessSendMessage(data);
      clearInput();
    }
  }

  function handleClick() {
    if (userCode) {
      const body = {
        userId: chat.data.id,
        userCode: userCode,
      };
      initiateChatApi(dispatch, body, onSuccess);
    } else {
      errorMessage("Please Enter User Code");
    }
  }

  function onSuccessGetMessages(data) {
    if (data?.data?.items?.length) {
      setMessages((prev) =>
        [...[...prev].reverse(), ...data?.data?.items].reverse()
      );
    }
  }

  // useEffect(() => {
  //   if (userCode && initiateChat.data && isInitiationSuccess) {
  //     const body = {
  //       id: initiateChat?.data?.data?.id,
  //       userCode: userCode,
  //     };
  //     getUserMessagesApi(dispatch, pageLimit, body, onSuccessGetMessages);
  //   }
  // }, [userCode, initiateChat.data, pageLimit, isInitiationSuccess]);

  function onConnect(data) {
    setMessages((prev) => [...prev, data.data]);
    const container = containerRef?.current;
    setTimeout(() => {
      container.scrollTo({
        top: container.scrollHeight - container.clientHeight,
        behavior: "smooth",
      });
    }, 300);
  }

  useEffect(() => {
    if (isInitiationSuccess) {
      socket.connect();

      const eventListenerName = `pchat-pubuser-${userCode}-${initiateChat?.data?.data?.id}`;
      socket.on(eventListenerName, onConnect);

      return () => {
        socket.disconnect();
        socket.off(eventListenerName, onConnect);
      };
    }
  }, [socket, userCode, initiateChat?.data?.data?.id, isInitiationSuccess]);

  function scrollFunc(e) {
    if (containerRef?.current?.scrollTop === 0) {
      setPageLimit((prev) => {
        return {
          page: prev.page + 1,
          limit: prev.limit,
        };
      });
    }
  }

  useEffect(() => {
    containerRef?.current?.addEventListener("scroll", scrollFunc);
    return () => {
      containerRef?.current?.removeEventListener("scroll", scrollFunc);
    };
  }, [messages]);

  useEffect(() => {
    if (messages?.length <= 10) {
      const container = containerRef?.current;
      if (container) {
        container.scrollTo({
          top: container.scrollHeight - container.clientHeight,
          behavior: "smooth",
        });
      }
    }
  }, [messages]);
  return (
    <div
      className="absolute bottom-20 w-[359px] bg-white rounded-lg shadow-2xl"
      style={{
        left: visible ? "-17.25rem" : "200%",
        transition: "all .3s ease",
      }}
    >
      <div className="flex p-4 bg-primary rounded-t-lg items-center justify-between">
        <h3 className="text-lg text-white">Live Chat</h3>
        <button>
          <RxCross1 color="#fff" size="20" />
        </button>
      </div>

      {/* CHAT BODY */}
      <>
        <div
          className="p-4 bg-[#fff] h-[331px]  overflow-y-auto"
          ref={containerRef}
        >
          <ChatMessages messages={messages} />
        </div>
        <ChatInput sendMessage={sendMessage} />
      </>
    </div>
  );
};

export default Chatbox;
