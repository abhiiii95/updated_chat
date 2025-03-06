import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import Home from "./pages/home";
import { ToastContainer } from 'react-toastify';
import { useAppStore } from "./store";
import { useEffect, useState } from "react";
import { apiClient } from "./lib/api-client";
import { GET_USER_ROUTES } from "./utils/constant";


const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />
}


const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children
}

function App() {

  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getUserData = async () => {
      try {

        const response = await apiClient.get(GET_USER_ROUTES, {
          withCredentials: true
        })
        console.log("App response User", response.data)
      } catch (error) {
        console.log("Error in fetching user data", error)
      }
    };
    if (!userInfo) {
      getUserData()
    }
    else {
      console.log("App userInfo: ", userInfo)
      setLoading(false)
    }
  }, [userInfo, setUserInfo])

  // if (loading) {
  //   return <div>Loading...</div>
  // }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
          <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
