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
  console.log("isAuthenticated check, token found:", token); // Debugging line
  return token !== null && token !== undefined;
};

const PrivateRoute = ({ children }) => {
  const auth = isAuthenticated();
  console.log("PrivateRoute, isAuthenticated:", auth); // Debugging line
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
        <Route path="*" element={<h1>404 Page not found</h1>}/>
      </Routes>
    </Router>
  );
}

export default App;
