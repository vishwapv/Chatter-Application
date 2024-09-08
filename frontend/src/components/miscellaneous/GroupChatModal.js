import { React, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ChatState } from "../../context/Context";
import TextField from "@mui/material/TextField";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";

// chips
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const GroupChatModal = ({ children }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  console.log("selectedUsers", selectedUsers);

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  console.log("searchResult", searchResult);

  const [loading, setLoading] = useState(false);

  const [severity, setSeverity] = useState("success");
  const [openTost, setOpenTost] = useState(false);
  const [message, setMessage] = useState("");

  const { user, chats, setChats } = ChatState();

  const handleClick = () => {
    openTost(true);
  };

  const handleCloseTost = () => {
    setOpenTost(false);
  };

  const handleSearch = async (query) => {
    console.log("searching");
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user && user.data && user.data.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSeverity("error");
      //   handleClick();
      setOpenTost(true);
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers.length) {
      setSeverity("warning");
      setMessage("Please fill all the fields");
      setOpenTost(true);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user && user.data && user.data.token}`,
        },
      };

      const payload = {
        name: groupChatName,
        users: selectedUsers.map((u) => u._id), // Send the users as an array of user IDs
      };

      const { data } = await axios.post(`/api/chats/group`, payload, config);

      setChats([data, ...chats]);
      handleClose();
      setGroupChatName("");
      setSelectedUsers([]);
      setSeverity("success");
      setOpenTost(true);
      setMessage("Group chat created successfully");

      setChats([data, ...chats]);
    } catch (error) {
      console.error(error);
      setSeverity("error");
      setMessage(error.response.data.message);
      setOpenTost(true);
    }
  };

  const handleAddUsers = (user1) => {
    if (selectedUsers.some((u) => u._id === user1._id)) {
      console.log("User is already added");
      return;
    }
    setSelectedUsers([...selectedUsers, user1]);
  };

  const handleDelete = (user1) => {
    setSelectedUsers(selectedUsers.filter((user) => user._id !== user1._id));
  };

  return (
    <div>
      <span onClick={handleOpen}>{children}</span>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Group chat
            </Typography>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <TextField
                id="outlined-basic"
                label="Chat Name"
                variant="outlined"
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Add users"
                variant="outlined"
                onChange={(e) => handleSearch(e.target.value)}
              />

              {selectedUsers && selectedUsers.length > 0 && (
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={1}
                >
                  {selectedUsers.map((user) => (
                    <Chip
                      key={user._id} // Use user._id as the unique key
                      label={user.name} // Display user name instead of the whole object
                      onDelete={() => handleDelete(user)} // Pass the user object to handleDelete
                      color="primary"
                    />
                  ))}
                </Stack>
              )}

              {/* selected users list */}
              {loading ? (
                <div>Loading...</div>
              ) : (
                searchResult?.slice(0, 4).map((user) => (
                  <div key={user._id}>
                    <input
                      type="checkbox"
                      checked={selectedUsers.some(
                        (selectedUser) => selectedUser._id === user._id
                      )} // Compare by user._id
                      onChange={() => handleAddUsers(user)} // Pass the user object to handleAddUsers
                    />
                    {user.name} {/* Display user name */}
                  </div>
                ))
              )}

              <Button variant="contained" onClick={handleSubmit}>
                Create Group chat
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
      <div>
        {/* <Button onClick={handleClick}>Open Snackbar</Button> */}

        <Snackbar
          open={openTost}
          //   autoHideDuration={6000}
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
      </div>
    </div>
  );
};

export default GroupChatModal;
