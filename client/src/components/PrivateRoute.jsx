import React from "react";
import { Navigate } from "react-router-dom";

// Mock authentication function
const isAuthenticated = () => {
  // Check if a token exists in local storage
  const token = localStorage.getItem("token");
  return token !== null && token !== undefined;
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
