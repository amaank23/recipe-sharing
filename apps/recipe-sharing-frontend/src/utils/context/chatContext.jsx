import { createContext, useContext, useState, useMemo, useEffect } from "react";
import Chat from "../../components/Chat/Chat";
import { socket } from "../socket";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chat, setChat] = useState({
    open: false,
    data: {
      user1Id: null,
      user2Id: null,
    },
  });

  const openChat = (user1Id, user2Id) => {
    setChat({
      open: true,
      data: {
        user1Id,
        user2Id,
      },
    });
  };

  const closeChat = () => {
    setChat({
      open: false,
      data: {
        user1Id: null,
        user2Id: null,
      },
    });
  };

  const value = useMemo(() => ({ ...chat, openChat, closeChat }), [chat]);
  function onMessageRecieved(data) {
    closeChat();
    setTimeout(() => {
      openChat(data.user1, data.user2);
    }, 500);
  }
  useEffect(() => {
    socket.on("newMessageRecieved", onMessageRecieved);
    return () => {
      socket.off("newMessageRecieved", onMessageRecieved);
    };
  }, []);
  return (
    <ChatContext.Provider value={value}>
      {chat.open && <Chat />}
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
