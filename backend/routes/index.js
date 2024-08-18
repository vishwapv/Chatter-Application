const user = require("../routes/userRoutes/userRoutes");

exports.addAPI = function (mount, app, cache) {
  app.use(mount + "/user", user);
};
