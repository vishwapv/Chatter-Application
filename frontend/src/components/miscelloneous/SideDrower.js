import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../../context/chatProvider";
import MyChat from "../miscelloneous/ProfileModel";
import ChatBox from "../../components/ChatBox";
import { Card, TextField } from "@material-ui/core";
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
import ProfileModel from "../miscelloneous/ProfileModel";
import { useHistory } from "react-router";
import clsx from "clsx";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import UserListItem from "../userAvatar/UserListItem";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStylesToast = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const useStylesDrawer = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  inputRoot: {
    color: "blue",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
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
  searchButton: {
    marginLeft: theme.spacing(1),
  },
  drawerSearch: {
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  drawerInput: {
    width: "70%",
  },
  drawerButton: {
    marginLeft: theme.spacing(1),
  },
}));

const SideDrower = () => {
  const classesDrawer = useStylesDrawer();
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // Search state
  const [searchInput, setSearchInput] = useState("");

  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChats, setLoadingChats] = useState();

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = async () => {
    // Handle the search logic here, e.g., send a request to the server
    console.log("Searching for:", searchInput);
    if (!searchInput.trim()) {
      setOpen(true);
    }
    try {
      setLoading(true); // why we are setting the loading to true ?

      const config = {
        // we have to send the JWT   Token in the header because we are using the protected routes
        headers: {
          Authorization: `Bearer ${
            user && user.data && user.data.data && user.data.data.token
          }`,
        },
      };
      const { data } = await axios.get(
        `/api/user?search=${searchInput}`,
        config
      );
      console.log("data", data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Error in fetching search results
        </Alert>
      </Snackbar>;
    }

    // Add your search logic, such as making an API call to fetch search results
  };

  const accessChat = async (userId) => {
    console.log(userId);
    try {
      setLoadingChats(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${
            user && user.data && user.data.data && user.data.data.token
          }`,
        },
      };

      const { data } = await axios.post(`/api/chats`, { userId }, config);
      if (!chats.find((c) => c._id === data._id)) {
        setChats([...chats, data]);
      }
      setSelectedChat(data); // we are setting the selected chat to the global state so that we can use it in the other components
      setLoadingChats(false);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const list = (anchor) => (
    <div
      className={clsx(classesDrawer.list, {
        [classesDrawer.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      //   onClick={toggleDrawer(anchor, false)}
      //   onKeyDown={toggleDrawer(anchor, false)}
    >
      <h2>Serach Users</h2>
      {/* Search bar inside the drawer */}
      <div className={classes.drawerSearch}>
        <TextField
          placeholder="Search... Claim"
          variant="outlined"
          size="small"
          className={classes.drawerInput}
          value={searchInput}
          onChange={handleSearchChange}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.drawerButton}
          onClick={handleSearch}
        >
          GO {/* inside the drawer */}
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClosetostyles}
        >
          <Alert severity="warning">This is a warning message!</Alert>
        </Snackbar>
      </div>

      <Divider />
      <List>
        {/* {backUpList && Object.keys(backUpList).length > 0 && backUpList.map((item, index) => ( */}
        {/* {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => ( */}
        {searchResult &&
          Object.keys(searchResult).length > 0 &&
          searchResult.map((item, index) => (
            <UserListItem
              button
              user={item}
              key={item._id}
              handleFunction={() => accessChat(item._id)}
            >
              {item.name}
            </UserListItem>
          ))}
      </List>
    </div>
  );

  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    // Profile handling logic here
  };

  const hanlelogout = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const classestostyles = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClicktostyles = () => {
    setOpen(true);
  };
  const handleClosetostyles = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const { user, chats, setChats, setSelectedChat } = ChatState();

  return (
    <div style={{ width: "100%", gap: "2rem" }}>
      <Card
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "99%",
          height: "10vh",
          padding: "10px",
          margin: "auto",
        }}
      >
        <div className={classes.search}>
          <div
            className={classes.searchIcon}
            onClick={toggleDrawer("left", true)}
          >
            <SearchIcon />
          </div>
        </div>
        <h1>Chatter</h1>
        <div style={{ display: "flex", gap: "1rem" }}>
          <NotificationsActiveIcon />
          <div>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <Avatar></Avatar>
              {user && user.data && user.data.data && user.data.data.name}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <ProfileModel user={user}>
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
              </ProfileModel>
              <MenuItem onClick={hanlelogout}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </Card>

      {/* Drawer component */}
      <SwipeableDrawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        {list("left")}
      </SwipeableDrawer>
    </div>
  );
};

export default SideDrower;
