import { React, useState } from "react";
import Login from "../components/Login";
import Registration from "../components/Registration";
import Card from "@mui/material/Card";

const Home = () => {
  const [isShow, setIsShow] = useState(false);
  return (
    <Card
      style={{
        display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        width: "40vw",
        height: "70vh",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "40vw",
          height: "10vh",
          padding: "10px",
        }}
      >
        <h1>Chatter Application</h1>
      </div>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <span
          style={{ display: "flex", width: "20vw", cursor: "pointer" }}
          onClick={() => setIsShow(!isShow)}
        >
          Login
        </span>

        <span onClick={() => setIsShow(false)} style={{ cursor: "pointer" }}>
          {" "}
          Registration
        </span>
      </div>

      {isShow ? <Login /> : <Registration />}
    </Card>
  );
};

export default Home;
