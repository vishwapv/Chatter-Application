const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const Protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("token :", token);

      const decoder = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoder :", decoder);

      req.user = await User.findById(decoder.id).select("-password");
      console.log("req.user :", req.user);

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized ,token failed");
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized , no token");
    }
  }
};
module.exports = { Protect };
