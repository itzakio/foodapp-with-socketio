import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

// Change this line for Next.js
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL; // Note: NEXT_PUBLIC_ prefix

export const useSocket = () => {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Add error handling if URL is missing
    if (!SOCKET_URL) {
      console.error("SOCKET_URL is not defined. Please set NEXT_PUBLIC_SOCKET_URL in .env.local");
      return;
    }

    // create socket connection
    socketRef.current = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
    });

    // connection event
    socketRef.current.on("connect", () => {
      setConnected(true);
      console.log("connect to the server", socketRef.current.id);
    });
    
    // disconnection event
    socketRef.current.on("disconnect", () => {
      setConnected(false);
      console.log("Disconnected from server");
    });

    socketRef.current.on("connected", (data) => {
      console.log("server message: ", data.message);
    });

    // cleanup
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);
  
  return {
    socket: socketRef,
    connected,
  };
};