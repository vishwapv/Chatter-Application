export const getSender = (loggedUser, users) => {
  console.log("users in getSender :", users);
  console.log("loggedUser in getSender :", loggedUser);
  const logedUser_id = loggedUser && loggedUser.data && loggedUser.data._id;
  const user_id = users && users[0] && users[0]._id;
  console.log("users_id in getSender :", user_id);

  console.log("logedUser_id in getSender :", logedUser_id);

  return user_id === logedUser_id ? users[1].name : users[0].name;
};
