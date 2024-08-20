const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt");

// const registerUser = expressAsyncHandler(async (req, res) => {
//     const { name, email, password } = req.body;
//     if(!username || !email || !password) {
//         res.status(400);
//         throw new Error("Please add all fields");
//     }
//     const userExit = await User.findOne({ email })
//     if (userExit) {
//         res.status(400)
//         throw new Error("User allready exist")
//     }

//     const User = await User.create({
//       name,
//       email,
//       password,
//     });

//     if (User) {
//         res.status(200).json({
//             _id: User._id,
//             name: User.name,
//             email: User.password
//         });
//     } else {
//         res.status(400)
//         throw new Error("user fail to register")
//     }

// })

exports.registerUser = (req, res) => {
  console.log("req", req.body);

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      Message: "Please add all fields",
    });
  }

  User.findOne({ email })
    .then((user) => {
      console.log("user", user);
      if (user) {
        return res.status(400).json({ Message: "User already registered" });
      } else {
        const newUser = new User({
          name: name,
          email: email,
          password: password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((newuser) => {
                const token = generateToken(newuser._id);
                console.log("token:", token);
                return res.status(201).json({
                  message: "User registered successfully",
                  data: { ...newuser.toObject(), token },
                });
              })
              .catch((err) => {
                return res.status(500).json({
                  message: "User did not register successfully",
                  data: err,
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "User got an error during registration",
        data: err,
      });
    });
};

exports.loginUser = (req, res) => {
  console.log("entered into the login user");
  console.log("req", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please add all fields",
    });
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;

          if (isMatch) {
            const token = generateToken(user._id);
            console.log("token :", token);
            return res.status(201).json({
              message: "User logged in successfully",
              data: { ...user.toObject(), token },
            });
          } else {
            return res.status(400).json({
              message: "Invalid credentials",
            });
          }
        });
      } else {
        return res.status(400).json({
          message: "User not found",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "User did not log in successfully",
        data: err,
      });
    });
};

exports.userList = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const user = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(user);
  console.log("keyword", keyword);
};

// .catch((err) => {
//   return res.status(500).json({
//     message: "User did not login successfully",
//     data: err,
//   });
// });
// exports.registerUser = (req) => {
//   return new Promise((resolve, reject) => {
//     console.log("req", req.body);

//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return reject({ Message: "Please add all the fields" });
//     }

//     User.findOne({ email })
//       .then((user) => {
//         if (user) {
//           return reject({ Message: "User already registered" });
//         } else {
//           const newUser = new User({
//             name: name,
//             email: email,
//             password: password,
//           });

//           return newUser.save();
//         }
//       })
//       .then((newuser) => {
//         resolve({
//           message: "User registered successfully",
//           data: newuser,
//         });
//       })
//       .catch((err) => {
//         console.error("Error during registration:", err);
//         reject({ error: err.message });
//       });
//   });
// };

// exports.registerUser = (req, res) => {
//   console.log("req", req.body);

//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ Message: "Please add all the fields" });
//   }

//   User.findOne({ email })
//     .then((user) => {
//       if (user) {
//         return res.status(400).json({ Message: "User already registered" });
//       } else {
//         const newUser = new User({
//           name: name,
//           email: email,
//           password: password,
//         });

//         return newUser.save();
//       }
//     })
//     .then((newuser) => {
//       return res.status(201).json({
//         message: "User registered successfully",
//         data: newuser,
//       });
//     })
//     .catch((err) => {
//       console.error("Error occurred during user registration:", err);
//       return res.status(500).json({ error: err.message });
//     });
// };
