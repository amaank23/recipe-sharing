import { createContext } from "react";

export const ChatContext = createContext({
  open: false,
  openChat: () => {},
  closeChat: () => {},
  data: {
    user1Id: null,
    user2Id: null,
  },
});
