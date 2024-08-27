import React from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

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

const ProfileModel = ({ user, children }) => {
  // we are passing the 2 props in this function "user", "children"
  // check if have any user in the local storage or not
  // if we have any profile in  the sideDrower place make a profile model or else show the eye icon instead of profile avathar
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button type="button" onClick={handleOpen}>
        {children ? (
          <span>{children}</span>
        ) : (
          <span>
            <VisibilityIcon />
          </span>
        )}
      </button>
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
            <h2 id="transition-modal-title">
              {user && user.data && user.data.data && user.data.data.name}
            </h2>
            <p id="transition-modal-description">
              {user && user.data && user.data.data && user.data.data.email}
            </p>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default ProfileModel;
