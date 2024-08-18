import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Login from "../components/authentication/Login";
import SignUp from "../components/authentication/SignUp";
import { Card, Tabs, Tab, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import React from "react";

function Home() {
  const [activeComponent, setActiveComponent] = useState("login");

  const handleLoginClick = () => {
    setActiveComponent("login");
  };
  const handleSignUpClick = () => {
    setActiveComponent("signup");
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <Card
        style={{
          width: "40rem",
          display: "flex",
          height: "3rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Chatter
      </Card>
      <Card
        style={{
          width: "40rem",
          display: "flex",
          height: "30rem",
          //   justifyContent: "center",
          //   alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Card
          style={{
            width: "40rem",
            display: "flex",
            height: "4rem",
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={handleLoginClick}
          >
            Login
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={handleSignUpClick}
          >
            SignUp
          </div>
        </Card>
        <div
          style={{
            width: "40rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
          }}
        >
          {activeComponent === "login" ? <Login /> : <SignUp />}
        </div>
      </Card>
    </div>
  );
}

export default Home;
