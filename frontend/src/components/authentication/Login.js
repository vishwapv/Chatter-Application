import React from "react";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    console.log(event.target.value);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        width: "20rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form noValidate autoComplete="off">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            width: "20rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField id="standard-basic" label="name" required />

          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />

          <Button variant="contained" color="primary">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
