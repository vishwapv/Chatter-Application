import React from "react";
import { ChatState } from "../context/Context";
import SingleChat from "./miscellaneous/SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  return (
    <div style={{ display: "flex", height: "100%", width: "50%" }}>
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default ChatBox;
