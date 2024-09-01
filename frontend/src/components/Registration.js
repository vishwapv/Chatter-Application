import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useHistory } from "react-router";

const Registration = () => {
  const history = useHistory;
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("sucess");
  const [message, setMessage] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const submitHandler = async () => {
    const { name, email, password } = state;
    console.log("clicked");
    console.log("state :", state);

    setLoading(true);
    if (!name || !email || !password) {
      handleClick();
      setSeverity("success");
      setMessage("Please provide all the field");
      return;
    }

    try {
      const config = {
        headers: {
          "Context-type": "application/json",
        },
      };
      const { data } = await axios.post("/api/user", state, config);
      console.log("data :", data);
      const obj = JSON.stringify(data);
      const user = localStorage.setItem("userInfo", obj);
      handleClick();
      setSeverity("success");
      setMessage("Registration is successfull");
      console.log("userLocal : ", user);

      history.push("/chats");
    } catch (error) {
      console.log("error in registration", error);
      handleClick();
      setSeverity("waring");
      setMessage("Registration already registered");
    }
  };

  const onChangleHandler = (e) => {
    const { id, value } = e.target;
    // console.log("name :", name);

    setState((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  // or we can do like ths
  // const onChangleHandler = (e) => {
  //   const { id, value } = e.target;
  //   setState((prev) => ({
  //     ...prev,
  //     [id]: value,
  //   }));
  // };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "40vw",
        height: "70vh",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <div>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          value={state.name}
          onChange={onChangleHandler}
        />
      </div>
      <div>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={state.email}
          onChange={onChangleHandler}
        />
      </div>
      <div>
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          value={state.password}
          onChange={onChangleHandler}
        />
      </div>
      <div>
        <Button variant="contained" onClick={() => submitHandler()}>
          Register
        </Button>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Registration;
