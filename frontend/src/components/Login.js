import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import { useHistory } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const history = useHistory();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
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
    const { email, password } = state;
    console.log("clicked");
    console.log("state :", state);
    setLoading(true);
    if (!email || !password) {
      handleClick();
      setSeverity("warning");
      setMessage("Please provide all the field");
      // setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Context-type": "application/json",
        },
      };
      const { data } = await axios.post("/api/user/login", state, config);
      console.log("data :", data);
      const obj = JSON.stringify(data);
      const user = localStorage.setItem("userInfo", obj);
      handleClick();
      setSeverity("success");
      setMessage("Logedin successfull");
      console.log("userLocal : ", user);
      setLoading(false);

      history.push("/chats");
    } catch (error) {
      console.log("error in registration", error);
      handleClick();
      setSeverity("waring");
      setMessage("Provide proper credantial");
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
        height: "40vh",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
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
        <Button
          variant="contained"
          onClick={() => submitHandler()}
          isloading={loading}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
