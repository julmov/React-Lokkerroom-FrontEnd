import React from "react";
import { Navigate } from "react-router-dom";

// Mock authentication function
const isAuthenticated = () => {
  // Implement your authentication check logic here
  // For example, check if a token exists in local storage
  return localStorage.getItem("token") !== null;
};

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
