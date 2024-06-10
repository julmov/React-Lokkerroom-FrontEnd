import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/LoginForm";
import Register from "./components/RegisterForm";
import Main from "./components/MainPage";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token || token === "undefined" || token === "null") {
    return false;
  }

  try {
    const { token: jwtToken } = JSON.parse(token);
    const payload = JSON.parse(atob(jwtToken.split(".")[1]));
    const isExpired = payload.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem("token");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error parsing token:", error);
    localStorage.removeItem("token");
    return false;
  }
};

const PrivateRoute = ({ children }) => {
  const auth = isAuthenticated();
  return auth ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<h1>404 Page not found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
