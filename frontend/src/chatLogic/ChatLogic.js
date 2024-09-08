// export const getSender = (loggedUser, users) => {
//   console.log("users in getSender :", users);
//   console.log("loggedUser in getSender :", loggedUser);
//   const logedUser_id = loggedUser && loggedUser.data && loggedUser.data._id;
//   const user_id = users && users[0] && users[0]._id;
//   console.log("users_id in getSender :", user_id);

//   console.log("logedUser_id in getSender :", logedUser_id);

//   return user_id === logedUser_id ? users[1].name : users[0].name;
// };
export const getSender = (loggedUser, users) => {
  if (!users || users.length < 2) {
    console.error("Invalid users array passed to getSender.");
    return ""; // Return empty string or default value if there are less than 2 users
  }

  const loggedUserId = loggedUser?.data?._id;
  return users[0]._id === loggedUserId ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  console.log("users in getSenderfull :", users);
  console.log("loggedUser in getSenderfull :", loggedUser);
  const logedUser_id = loggedUser && loggedUser.data && loggedUser.data._id;
  const user_id = users && users[0] && users[0]._id;
  console.log("users_id in getSenderfull :", user_id);

  console.log("logedUser_id in getSenderfull :", logedUser_id);

  return user_id === logedUser_id ? users[1] : users[0];
};
