import React, { useState } from "react";
import { ChatState } from "../context/Context";
import { Card } from "@mui/material";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChat";
import ChatBox from "../components/ChatBox";

const Chat = () => {
  const user = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
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
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Card>
    </div>
  );
};

export default Chat;
