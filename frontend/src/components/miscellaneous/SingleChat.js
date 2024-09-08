import React from "react";
import { ChatState } from "../../context/Context";
import { getSender, getSenderFull } from "../../chatLogic/ChatLogic";
import ProfileModel from "./ProfileModel";
import UpdateGroupChat from "./UpdateGroupChat";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSlectedChat } = ChatState();
  console.log("selectedChat", selectedChat);

  return (
    <div>
      {selectedChat ? (
        <div>
          {!selectedChat.isGroupChat ? (
            <div
              div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "auto",
                margin: "10px 0",
              }}
            >
              <div>{getSender(user, selectedChat.users)}</div>
              <div>
                <ProfileModel user={getSenderFull(user, selectedChat.users)} />
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>{selectedChat.chatName.toUpperCase()}</div>
              <div>
                <UpdateGroupChat />
              </div>
            </div>
          )}
        </div>
      ) : (
        <h1
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Click on a user to start chat
        </h1>
      )}
    </div>
  );
};

export default SingleChat;
