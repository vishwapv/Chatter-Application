import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setState((prevValue) => ({
      ...prevValue,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = state;
    if (!(email && password)) {
      alert("Please enter all the fields");
      return; // Prevent further execution if fields are empty
    }

    try {
      const response = await axios.post("/api/user/login", state);
      const token =
        response &&
        response.data &&
        response.data.data &&
        response.data.data.token;
      console.log("token :", token);
      console.log("response :", response);
      if (response.status === 201) {
        console.log("response.status:", response.status);
        localStorage.setItem("token", token);
        alert("User logged in successfully");

        history.push("/chat"); // Navigate to the chat page
      }
    } catch (error) {
      console.log("There was an error logging in", error);
      alert("Error in login");
    }
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
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
          <TextField
            id="email"
            label="Email"
            required
            onChange={handleChange}
            value={state.email}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            required
            onChange={handleChange}
            value={state.password}
            autoComplete="current-password"
          />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
