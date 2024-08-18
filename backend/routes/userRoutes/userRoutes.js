const express = require("express");
const { registerUser, loginUser } = require("../../controller/userController");
const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", loginUser);

module.exports = router;

// module.exports = (passport) => {
//   const router = express.Router();

//   // Note: Fixed the parameter order here: (req, res)
//   router.post("/", (req, res) => {
//     console.log("entered  inside the post router of the register route");
//     userController
//       .registerUser(req)
//       .then((result) => {
//         console.log("result", result);
//         return res.status(200).json({
//           message: "User registered successfully",
//           data: result,
//         });
//       })
//       .catch((err) => {
//         return res.status(400).json({
//           message: "Registration failed",
//           error: err.message || err,
//         });
//       });
//   });

//   return router;
// };
