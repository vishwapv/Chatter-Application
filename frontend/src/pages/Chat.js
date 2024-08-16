import React, { useEffect, useState } from "react";
import axios from "axios";

const Chat = () => {
  const [chats, setChats] = useState([]);
  console.log("chats :", chats);
  const fetchData = async () => {
    const response = await axios.get("/api/chat");
    setChats(response.data); // Set the state with the fetched data
    console.log("Data:", response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {chats.map((chat) => (
        <div key={chat._id}> {chat.chatName}</div>
      ))}
    </>
  );
};

export default Chat;
