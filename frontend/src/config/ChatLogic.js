export const getSender = (loggedUser, users) => {
  console.log("loggedUser logic", loggedUser);
  console.log("users logic", users);
  const loggedUser_id =
    loggedUser &&
    loggedUser.data &&
    loggedUser.data.data &&
    loggedUser.data.data._id;
  console.log("loggedUser_id", loggedUser_id);

  return users[0]._id === loggedUser_id ? users[1].name : users[0].name;
};
