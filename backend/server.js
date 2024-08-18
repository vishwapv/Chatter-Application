const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes/userRoutes");

const app = express();

dotenv.config();
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.use("/api/user", userRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});
