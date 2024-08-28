import React, { useState } from "react"; // Corrected import order
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import { Button, Card, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert"; // Moved up import for MuiAlert
import { ChatState } from "../../context/chatProvider";
import axios from "axios";
import UserListItem from "../userAvatar/UserListItem";
import UserBadgeItem from "../userAvatar/UserBadgeItem";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const GroupChatModal = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  console.log("selectedUsers : ", selectedUsers);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  console.log("searhResult : ", searchResult);

  const [loading, setLoading] = useState(false);

  const [alertMessage, setAlertMessage] = useState(""); // State for alert message
  const [alertSeverity, setAlertSeverity] = useState("warning");

  const [snackbarOpen, setSnackbarOpen] = useState(false); // Highlight: State to control Snackbar visibility

  const { user, chats, setChats } = ChatState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    // Highlight: Added async keyword
    event.preventDefault();
    console.log("clicked on submit button");
    // Added validation for group chat name and selected users
    if (!groupChatName.trim() && selectedUsers.length < 2) {
      setAlertMessage(
        "Please provide a valid group name and add at least two users."
      );
      setAlertSeverity("warning");
      setSnackbarOpen(true); // Highlight: Trigger Snackbar
      return;
    }
    setOpen(false);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            user && user.data && user.data.data && user.data.data.token
          }`,
        },
      };

      const { data } = await axios.post(
        "/api/chats/group",
        {
          name: groupChatName,
          users:
            selectedUsers &&
            Object.keys(selectedUsers).length > 0 &&
            selectedUsers.map((u) => u._id),
        },
        config
      );

      setChats([data, ...chats]);
      handleClose();
      setAlertMessage("Group Created successfully.");
      setAlertSeverity("success");
      setSnackbarOpen(true); // Highlight: Trigger Snackbar
      console.log("data from creating the group :", data);
    } catch (error) {
      console.log("error in creating the group :", error);
    }
    // Proceed with further actions if needed
  };

  const handleDelete = (delUser) => {
    console.log("deleteusers : ", delUser._id);
    console.log("selectedusers from state", selectedUsers);

    // use filter for removing the deleted user
    // if selected user is ! == to deleted users set that in selected users

    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleSearch = async (query) => {
    console.log("clicked on search button", query);
    setLoading(true);
    setSearch(query);
    if (!query) {
      setLoading(false); // Highlight: Stop loading when there is no query
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            user && user.data && user.data.data && user.data.data.token
          }`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log("search result : ", data);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log("error :", error);
      setLoading(false); // Highlight: Stop loading on error
    }
  };

  const handleGroup = (userToAdd) => {
    console.log("userToAdd : ", userToAdd);

    if (selectedUsers.some((user) => user._id === userToAdd._id)) {
      // Highlight: Changed includes to some for object comparison
      setAlertMessage("User already added");
      setSnackbarOpen(true); // Highlight: Trigger Snackbar
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSnackbarClose = () => {
    // Highlight: Added function to handle Snackbar close
    setSnackbarOpen(false);
  };

  return (
    <>
      <span onClick={handleOpen}>{children}</span>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Create group chat</h2>
            <div>
              <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="Group Name"
                  variant="outlined"
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Search Users"
                  variant="outlined"
                  onChange={(e) => handleSearch(e.target.value)}
                />

                {/*  selected users  */}
                {/* render search users   */}
                <Card>
                  {selectedUsers &&
                    Object.keys(selectedUsers).length > 0 &&
                    selectedUsers.map((u) => (
                      <UserBadgeItem
                        user={u}
                        key={u._id}
                        handleFunction={() => handleDelete(u)}
                      />
                    ))}
                </Card>

                {loading ? (
                  <div>loading...</div>
                ) : (
                  searchResult.slice(0, 4).map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleGroup(user)} // Highlight: Corrected handleFunction syntax
                    />
                  ))
                )}

                <Button type="submit" variant="contained" color="primary">
                  Create Chat
                </Button>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>

      {/* Highlight: Added Snackbar for alerts */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={alertSeverity}>
          {/* Highlight: Use alertSeverity */}
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default GroupChatModal;
