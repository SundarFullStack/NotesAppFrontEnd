import { useState,useEffect,useContext } from 'react'
import './App.css';
import { Routes, Route ,useNavigate} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Application/Home/Home"
import Login from "./Pages/Authentication/Login";
import SignUp from "./Pages/Authentication/SignUp";
import ForgotPassword from "./Pages/Authentication/ForgotPassword";
import FPUpdate from "./Pages/Authentication/FPUpdate";
import Header from "./Components/Header/Header";
import { LoginContext } from "./Components/Context/ContextProvider"
import API_URL from "../Config/GlobalUrl";
import axios from "axios";
function App() {
  const { loginData, setLoginData } = useContext(LoginContext);
  const {userId, setUserId} =  useContext(LoginContext);
  const navigator = useNavigate();
  // console.log("loginData", loginData);
  // console.log("userID",userId);
       // API for validating current user using login token

       const DashboardValid = async () => {
        try {
          const user = JSON.parse(localStorage.getItem("UserInfo"));
    
          // console.log("UserFront", user);
          if (user) {
            const headers = {
              Authorization: user,
              "Content-Type": "application/json",
            };
    
            let response = await axios.get(`${API_URL}/validUser`, { headers });
    
            if (response.status == 200) {
                setLoginData(response.data.UserData.name);
                setUserId(response.data.UserData._id)
            } else if (response.status == 201) {
              navigator("/");
            }
          }
        } catch (error) {
          console.log("Error Occurred:", error);
        }
      };
    
        useEffect(() => {
            DashboardValid();
      })
  return (
    <>
  
      <Header/>
      <Routes>
        <Route path="/" element={<Layout/>} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
         <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/FPUpdate/:token" element={<FPUpdate />} />
         <Route path="/Home" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
