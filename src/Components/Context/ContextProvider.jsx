import React, { createContext, useState, useContext } from "react";

// CREATE CONTEXT USING CREATECONTEXT KEYWORD WITH LOGIN CONTEXT VARIABLE

export const LoginContext = createContext({
  loginData: [],
  setLoginData: () => Promise,
  userId: [],
  setUserId: () => Promise,
  notesList: [],
  setNotesList: () => Promise,
});

// EXPORTING CONTEXT WITH USE CONTEXT KEYWORD
export const useMyContext = () => useContext(LoginContext);

const Context = ({ children }) => {
  let [loginData, setLoginData] = useState(null);
  let [userId, setUserId] = useState(null);
  let [notesList, setNotesList] = useState([]);

  let value = {
    loginData,
    setLoginData,
    userId,
    setUserId,
    notesList,
    setNotesList,
  };
  return (
    <>
      <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
    </>
  );
};

export default Context;
