import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// Correctly create a context
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  // we are use the useState hook for the state manegment
  const [user, setUser] = useState();
  const history = useHistory();
  //why we are using the useEffect ? Because we have to fetch the data from the localStorage
  useEffect(() => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log("userInfo :", userInfo);
      setUser(userInfo);
      if (userInfo == null) history.push("/");
    } catch (error) {
      console.log(
        "error in redirecting to the login page because user info is not there in the localStorage,",
        error
      );
    }
  }, [history]);

  return (
    <ChatContext.Provider value={{ user, setUser }}>
      {children}
    </ChatContext.Provider>
  );
};

// we are creating the useContext
// 1. we have to create a function for the use context
export const ChatState = () => {
  // where we use this function ?????

  //find the answer for this
  // inside this we are creating the use context so that this function can be used where ever we want
  // When we write the code we have to return some value back to this function

  return useContext(ChatContext);
};

export default ChatProvider;
export { ChatContext };
