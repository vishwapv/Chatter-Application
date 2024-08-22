const Chat = require("../models/chatModels");
const User = require("../models/userModel");

exports.accessChat = async (req, res) => {
  console.log("req", req.body);
  const { userId } = req.body; // this is the ID from the user who want to chat
  if (!userId) {
    // verifying the where the user id is sent or not
    console.log("user id is not sent to the request");
    return res.status(4001);
  }
  var isChat = await Chat.find({
    //  if user is there we will find the wheather the use is having the group chat or not
    isGroupChat: false,
    $and: [
      // it should contain the to user id one is personal id and other one is the use who chat with or sends the message
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password") // we will bring the all user details of both the users
    .populate("latestMessage"); // and also we will bring the latest message of both the users

  isChat = await User.populate(isChat, {
    // we are populating the latest message of both the users
    path: "latestMessage.sender",
    select: "name email pic",
  });

  if (isChat.length > 0) {
    // if the chatter is found then we have to send the first msg of the sender or user
    return res.status(200).send(isChat[0]);
  } else {
    // or else create the new chat
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
  }

  try {
    const createdChat = await Chat.create(chatData); // save the chat created in the data base

    const FullChat = await Chat.findOne({ _id: createdChat.id }).populate(
      // for the created chat we can find the full chat for the user with the user full details
      "users",
      "-password"
    );
    return res.status(200).send(FullChat); // we are sending the full chat for the user as a response.
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

exports.fetchChats = async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.createGroupChat = async (req, res) => {
  console.log("i entered inside the group");
  if (!req.body.users || !req.body.name) {
    // if the didnot add the users or group name we will throw the error that "Please provide the require feild"
    res.status(400).send({ message: "please provide the specific feild" });
  } else {
    console.log(" got all the feilds");
  }

  // when  the required filled is filled we show all the user present in the chats and we are storing in the user variable

  //   var users = JSON.parse(req.body.users);
  //   console.log("users", users);
  var users = req.body.users;
  console.log("users", users);

  // why we are parseing the value ? because we want the data in the obj formate and we are getting the data in string formate to covert the string to obj we use JSON.parse

  // if there is only one users we can't create the group so we should have atleast 2 users including the current user
  if (users.length < 2) {
    return res
      .status(400)
      .send("More than the  2 users are required to create the group");
  }

  users.push(req.user); // we are addiding the personal account to the group using the push so that it is mandatory to keep the user in the group

  // we have to store the data of groupChat  in the collections, following proccess is required
  // why we are using the try catch in    the below code ????
  // 1 create a variable to store the value of  group chats "THAT SHOULD BE ASYCH AWAIT FUNCTION "
  // 2 find out in which collection we should create the data
  // 3 use "create" function to create the data in the data base
  // 4 we have to store the data in the form of object
  // a. group name : which will come from the req.body.name
  // b. users : which is comming from the users collections  users that is --> req.body.users
  // c. isGroupChat: true --> because we are creating the group
  // d. groupAdmin : who created the group
  // we have to create full group chat
  // 1.   will find the user from the id who all are in the group and we will populate the details of that id means (there name pic and the email  and check whether that id is admin or not)
  // 2. send that response

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: req.body.users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat.id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

// updating the group name
// 1. take the request from the body of the user
// 2. destructure the body
// 3. create a variable use await to update the name of the group use "findByIdUpdate" to find the data and update
// 4. populate the users details and group Admin without password
// 5. if chatname is not updated throw new error "Chat not found "
// 6. else return the json data

exports.renameGroup = async (req, res) => {
  const { chatI, chatName } = req.body;

  try {
    // Use `findByIdAndUpdate` instead of `findByIdUpdate`
    const updatedGroup = await Chat.findByIdAndUpdate(
      chatI,
      { chatName }, // Update the correct field with the new name
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedGroup) {
      return res.status(400).send({ message: "Error in renaming the group" });
    }

    res
      .status(200)
      .send({ message: "Chat updated successfully", updatedGroup });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!added) {
      res.status(400);
      throw new Error("chat not found");
    } else {
      res.send(added);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    const remove = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!remove) {
      res.status(400);
      throw new Error("user did not removed from the group");
    } else {
      res.send(remove);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
