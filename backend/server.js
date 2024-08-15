const express = require("express");

const app = express();
app.get("/", (req, res) => {
  res.send("API is Running");
});

app.listen(5001, console.log("Server started on Port 5001"));
