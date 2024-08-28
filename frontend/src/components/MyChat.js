import { Button, Card } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ChatState } from "../context/chatProvider";
import axios from "axios";
import { getSender } from "../config/ChatLogic";
import GroupChatModal from "./miscelloneous/GroupChatModal";

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
        {/* // create a group chat 
          1 create a button to create a group chat
          2 when clicked on the button open the modal
          3 create groupchatmodal own component in miscellaneous folder create the modal inside the component
          4 create span and pass the children as props to the button.
          4 create state 
            1 groupChatName 
            2 selected users this will be an array of users 
            3 search query 
            4 search results this will be the empty array 
            5 loading initially it will be "false"
        5 import the chatState from context with "user", "chats", "setChats"
        6 name should be the create group chat
        7 create form with group name and serach users with "create chat" button
        */}
        <GroupChatModal>
          <Button>Group chat</Button>
        </GroupChatModal>
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
