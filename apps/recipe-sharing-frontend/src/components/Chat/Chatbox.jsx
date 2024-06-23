import React, { useContext, useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Input } from "antd";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { errorMessage } from "../../utils/message";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { socket } from "../../utils/socket";
import CustomButton from "../Button/CustomButton";
import { useChat } from "../../utils/context/chatContext";
import {
  createChatApi,
  getAllChatMessagesApi,
  sendMessageApi,
} from "../../redux/api/Chat";
import { getFromStorage } from "../../utils/storage";

const Chatbox = ({ toggleChatBox, visible, color }) => {
  const containerRef = useRef();
  const dispatch = useDispatch();
  const sendChatMessage = useSelector((state) => state.sendChatMessage);
  const user = getFromStorage("user");
  const [chat, setChat] = useState(null);
  const initiateChat = useSelector((state) => state.initiateChat);
  const [isInitiationSuccess, setInitiationSuccess] = useState(false);
  const [messages, setMessages] = useState([]);
  const [pageLimit, setPageLimit] = useState({
    page: 1,
    limit: 6,
  });
  const chatContext = useChat();
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
      senderId: user.id,
      recieverId:
        chatContext?.data?.user1Id === user.id
          ? chatContext?.data?.user2Id
          : chatContext?.data?.user1Id,
      content: message,
    };
    function onSuccessInputMessage() {
      clearInput();
    }
    sendMessageApi(dispatch, body, chat.id, onSuccessInputMessage);
  }

  // function handleClick() {
  //   if (userCode) {
  //     const body = {
  //       userId: chat.data.id,
  //       userCode: userCode,
  //     };
  //     initiateChatApi(dispatch, body, onSuccess);
  //   } else {
  //     errorMessage("Please Enter User Code");
  //   }
  // }

  function onSuccessGetMessages(data, isMounted) {
    if (data?.data?.length) {
      if (isMounted) {
        setMessages((prev) => [...data?.data].reverse());
      } else {
        setMessages((prev) =>
          [...[...prev].reverse(), ...data?.data].reverse()
        );
      }
    }
  }

  function onConnect(data) {
    console.log("data");
    setMessages((prev) => [...prev, data]);
    const container = containerRef?.current;
    setTimeout(() => {
      container.scrollTo({
        top: container.scrollHeight - container.clientHeight,
        behavior: "smooth",
      });
    }, 300);
  }

  useEffect(() => {
    if (chat) {
      socket.emit("join-chat", chat.id);
      socket.on("newMessage", onConnect);
      return () => {
        socket.off("newMessage", onConnect);
        socket.emit("leave-chat", chat.id);
      };
    }
  }, [chat]);

  function scrollFunc(e) {
    if (containerRef?.current?.scrollTop === 0) {
      const newPageLimit = { page: pageLimit.page + 1, limit: pageLimit.limit };
      getAllChatMessagesApi(
        dispatch,
        newPageLimit,
        chat.id,
        (data, isMounted = false) => onSuccessGetMessages(data, isMounted)
      );
      setPageLimit(newPageLimit);
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

  function onChatCreationSuccess(data) {
    setChat(data.data);
    getAllChatMessagesApi(
      dispatch,
      pageLimit,
      data.data.id,
      (data, isMounted = true) => onSuccessGetMessages(data, isMounted)
    );
  }

  useEffect(() => {
    if (chatContext?.data?.user1Id && chatContext?.data?.user2Id) {
      createChatApi(
        dispatch,
        {
          user1Id: chatContext?.data?.user1Id,
          user2Id: chatContext?.data?.user2Id,
        },
        onChatCreationSuccess
      );
    }
  }, []);
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
        <button onClick={chatContext.closeChat}>
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
