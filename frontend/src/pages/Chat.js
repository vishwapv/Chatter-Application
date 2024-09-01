import React from "react";
import { ChatState } from "../context/Context";
import { Card } from "@mui/material";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChat";
import ChatBox from "../components/ChatBox";

const Chat = () => {
  const user = ChatState();
  console.log("user :", user);
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "8vh",
          justifyContent: "space-between",
        }}
      >
        {user && <SideDrawer />}
      </div>
      <Card
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Card>
    </div>
  );
};

export default Chat;
