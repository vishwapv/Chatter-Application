const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`monogoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit();
  }
};
module.exports = connectDB;
