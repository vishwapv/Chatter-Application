import React from "react";
import { ChatState } from "../../context/chatProvider";
import { Card } from "@material-ui/core";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Card
      style={{ cursor: "pointer", margin: "5px 0px" }}
      onClick={handleFunction}
    >
      <span>{user.name}</span>
    </Card>
  );
};

export default UserListItem;
