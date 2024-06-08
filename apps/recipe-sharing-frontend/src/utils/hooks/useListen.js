import { useEffect, useState } from "react";
import { socket } from "../socket";

export function useListen(listenerName) {
  const [data, setData] = useState(null);
  function onConnect(data) {
    setData(data);
  }
  console.log(listenerName);
  useEffect(() => {
    socket.on(listenerName, onConnect);
    return () => {
      socket.off(listenerName, onConnect);
    };
  }, []);
  return [data];
}
