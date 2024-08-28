import { Card, Collapse } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import React from "react";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Card
      style={{
        display: "inline-block", // Ensures the card behaves like a chip
        padding: "8px 12px", // Provides padding for the chip content
        margin: "4px", // Adds space between chips if multiple are displayed
        borderRadius: "16px", // Gives the card a rounded chip-like shape
        backgroundColor: "#f0f0f0", // Optional: Background color for visual appeal
        fontSize: "14px", // Font size for the chip content
        cursor: "pointer", // Changes cursor to pointer for interactivity
        boxShadow: "none", // Removes shadow for a flat look
        border: "1px solid #ccc",
        width: "2rem",
        height: "2rem",
      }}
      onClick={handleFunction}
    >
      {user.name}
      <CancelIcon />
    </Card>
  );
};

export default UserBadgeItem;
