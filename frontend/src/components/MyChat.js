import React, { useEffect, useState } from "react";
import { ChatState } from "../context/Context";
import axios from "axios";
import { Card } from "@mui/material";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { getSender } from "../chatLogic/ChatLogic";
import Button from "@mui/material/Button";
import GroupChatModal from "./miscellaneous/GroupChatModal";

const MyChat = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { user, setUser, chats, setChats, selectedChat, setSelectedChat } =
    ChatState();
  console.log("user in Mychats :", user);
  console.log("user in Mychats chats :", chats);

  const toke = user && user.data && user.data.token;
  console.log("token in mychat", toke);

  const fetchChats = async () => {
    console.log("entered inside the Mychat fetchChats");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user && user.data && user.data.token}`,
        },
      };
      console.log("config :", config);

      const { data } = await axios.get("/api/chats", config);
      console.log("data in Mychats axios", data);
      setChats(data);
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);
  return (
    <Card
      style={{
        width: "40vw",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "40vw",
        }}
      >
        <p>My Chats</p>
        <GroupChatModal>
          <Button>Group Chats + </Button>
        </GroupChatModal>
      </div>
      {chats &&
        Object.keys(chats).length > 0 &&
        chats.map((chat) => {
          console.log("chat in map function:", chat);

          // **Corrected part below**:
          return (
            <List key={chat._id}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon onClick={() => setSelectedChat(chat)}>
                    <Avatar />
                    {!chat.isGroupChat
                      ? (() => {
                          const sender = getSender(loggedUser, chat.users);
                          console.log("Sender:", sender);
                          return sender;
                        })()
                      : chat.chatName}
                  </ListItemIcon>
                  <ListItemText />
                </ListItemButton>
              </ListItem>
            </List>
          );
        })}
    </Card>
  );
};

export default MyChat;
