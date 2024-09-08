import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TextField from "@mui/material/TextField";

import { ChatState } from "../../context/Context";

// Snackbar

import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Chip, Stack } from "@mui/material";

// modal style
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

const UpdateGroupChat = ({ fetchAgain, setFetchAgain }) => {
  // modal functionality
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // updatedgroupChats
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  // snackbar state

  const [openSnakbar, setOpenSnakbar] = useState(false);
  const [snakbarMessage, setSnakbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  // use context
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  console.log(selectedChat, "selectedChat");

  // tost notification

  // functionality

  // snackbar functionality

  const handleClickSnackbar = () => {
    setOpenSnakbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnakbar(false);
  };

  // delete the user from the group

  const handleDelete = async (user) => {};

  return (
    <div>
      <VisibilityIcon onClick={handleOpen} />
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
              {selectedChat.chatName}
            </Typography>
            {selectedChat &&
              selectedChat.users &&
              selectedChat.users.length > 0 && (
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={1}
                >
                  {selectedChat.users.map((user) => (
                    <Chip
                      key={user._id}
                      label={user.name}
                      onDelete={() => handleDelete(user)}
                      color="primary"
                    />
                  ))}
                </Stack>
              )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Group Chat Name"
                variant="outlined"
              />
              <Button variant="contained">Update</Button>
            </div>
          </Box>
        </Fade>
      </Modal>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snakbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UpdateGroupChat;
