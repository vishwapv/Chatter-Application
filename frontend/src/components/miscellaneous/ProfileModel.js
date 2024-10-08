import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { ChatState } from "../../context/Context";

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

const ProfileModel = ({ user, children }) => {
  console.log("user in profile all list:", user);

  console.log("user in profile :", user && user.name);
  console.log("user in profile :", user && user.email);
  const userModal = user && user.name;
  const emailModal = user && user.email;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {children ? (
        <Button onClick={handleOpen}>Open modal</Button>
      ) : (
        <VisibilityIcon onClick={handleOpen} />
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {userModal}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {emailModal}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileModel;
