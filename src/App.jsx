import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routing/AppRoutes";
import { ToastContainer } from "react-toastify";
import React, { createContext, useState, useEffect } from "react";
import { fetchUserData } from "./services/user";

export const UserContext = createContext(null);

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      fetchUserData()
        .then((res) => {
          console.log("البيانات وصلت السيرفر بنجاح:", res.data.user);
          setUserData(res.data.user);
        })
        .catch((err) => {
          console.error("Error fetching user context:", err);
        });
    }
  }, []);

  return (
   <UserContext.Provider value={{ userData, setUserData }}>
  <RouterProvider router={router} />
  <ToastContainer position="top-right" autoClose={3000} theme="light" />
</UserContext.Provider>)
}

export default App;