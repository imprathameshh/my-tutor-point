import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

const Protected = () => {
  useEffect(() => {
    console.log("Component mounted");
  }, []);

  const isLoggedIn = Boolean(localStorage.getItem("accesstoken"));
  console.log(isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default Protected;
