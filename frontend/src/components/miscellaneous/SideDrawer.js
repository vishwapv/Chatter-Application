import React, { useState } from "react";
import Card from "@mui/material/Card";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import TextField from "@mui/material/TextField";

import { useHistory } from "react-router-dom";

import ProfileModel from "./ProfileModel";

import { ChatState } from "../../context/Context";

const SideDrawer = () => {
  const [opens, setOpens] = React.useState(false);
  const [openTost, setOpenTost] = React.useState(false);

  const [search, setSearch] = useState("");

  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChats, setLoadingChats] = useState(false);

  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");

  const handleClickToast = () => {
    setOpenTost(true);
  };
  const handleCloseTost = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenTost(false);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpens(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SearchIcon />
        <TextField
          id="outlined-basic"
          label="search user"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" onClick={() => handleSearch()}>
          GO
        </Button>
      </div>

      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleSearch = async () => {
    if (!search) {
      console.log("search not found");

      handleClickToast();
      setSeverity("warning");
      setMessage("Please enter the text");
      return;
    }
  };

  const { user } = ChatState();

  const history = useHistory();

  const Username = user && user.data && user.data.name;
  console.log("Username :", Username);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  return (
    <Card
      style={{
        width: "100%",
        height: "8vh",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <SearchIcon onClick={toggleDrawer(true)} />
      </div>
      <div>Chatter</div>
      <div style={{ display: "flex" }}>
        <NotificationsActiveIcon />
        {/* we will have notification menu */}

        <Avatar>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Avatar />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {/* // this proile modal will take two parameter one is user and other one is children   */}
            <ProfileModel user={user}>
              <MenuItem onClick={handleClose}>MyProfile</MenuItem>
            </ProfileModel>

            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </Menu>
        </Avatar>
        {Username}
      </div>
      <Drawer open={opens} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Snackbar
        open={openTost}
        autoHideDuration={6000}
        onClose={handleCloseTost}
      >
        <Alert
          onClose={handleCloseTost}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default SideDrawer;
