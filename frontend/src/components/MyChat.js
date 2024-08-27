import { Card } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ChatState } from "../context/chatProvider";
import axios from "axios";
import { getSender } from "../config/ChatLogic";

const MyChat = ({ fetchAgain }) => {
  const { user, setChats, setSelectedChat, chats } = ChatState();
  const [loggedUser, setLoggedUser] = useState();
  console.log("loggedUser", loggedUser);

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${
            user && user.data && user.data.data && user.data.data.token
          }`,
        },
      };

      const { data } = await axios.post(`/api/chats`, config);
      setChats(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));

    fetchChats();
  }, [fetchAgain]);
  return (
    <Card style={{ width: "300px", height: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>My Chats</div>
        <div>Group chat</div>
      </div>
      <div>
        {chats
          ? chats &&
            Object.keys(chats).length > 0 &&
            chats.map((item) => (
              <Card
                onClick={() => {
                  setSelectedChat(item);
                }}
                key={item._id}
              >
                <Card>
                  {/* // if the user is not a group chat then show the name of the user */}
                  {!item.isGroupChat
                    ? getSender(loggedUser, item.users)
                    : item.chatName}
                </Card>
              </Card>
            ))
          : "No Chats"}
      </div>
    </Card>
  );
};

export default MyChat;
