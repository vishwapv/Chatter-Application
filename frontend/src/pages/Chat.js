import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../context/chatProvider";
import SideDrower from "../components/miscelloneous/SideDrower";
import MyChat from "../components/MyChat";
import ChatBox from "../components/ChatBox";
import { Card } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@material-ui/core/Avatar";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "blue",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Chat = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null); // Changed React.useState to useState for consistency

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    // Profile handling logic here
  };

  // Why we are destructuring this
  // We are destructuring this because we are using this in the context from the context file we will get all the data which is required in the chat page???
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    // Side drawer to show all users ("this is the header section")
    // If user is there, show all the users in the list
    // If users are there, then show the chat box
    <div style={{ width: "100%", gap: "2rem" }}>
      {user && <SideDrower />}
      {/* Write the condition that if the user is there then only show the user list, create all the chat of the user ("user list") */}
      <Card
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "91.5%",
        }}
      >
        {user && <MyChat fetchAgain={fetchAgain} />}
        {/* Write the condition that if the user is there then only create the chat box to chat with others */}
        {user && <ChatBox />}
      </Card>
    </div>
  );
};

export default Chat;
