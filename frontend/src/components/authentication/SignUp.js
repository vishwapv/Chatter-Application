import React from "react";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";

const SignUp = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    // const { id, value } = e.target.value; // this is the string value
    const { id, value } = e.target; // this is the object value
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password } = state;
    if (!(name && email && password)) {
      alert("please enter all the feilds");
    }

    try {
      const response = await axios.post("/api/user", state);
      console.log("response", response);
      if (response.status === 201) {
        console.log("response.status :", response.status);
        alert("user saved successfully");
      }
    } catch (error) {
      console.log("error", error);
    }
    console.log("state", state);
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
            id="name"
            label="name"
            required
            onChange={handleChange}
            value={state.name}
          />
          <TextField
            id="email"
            label="email"
            required
            onChange={handleChange}
            value={state.email}
          />

          <TextField
            id="password"
            label="password"
            required
            onChange={handleChange}
            value={state.password}
          />
          <TextField
            id="confirm-Password"
            label="confirm Password"
            type="password"
            autoComplete="current-password"
          />

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
