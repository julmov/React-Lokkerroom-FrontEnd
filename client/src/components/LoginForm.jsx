import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import "../css/LoginPage.css";
import "../index.css"; 

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Use useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://secret-bayou-22282-49e42fb604f5.herokuapp.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log(data); // Handle the response data as needed
      console.log("Data fetched");

      // Redirect to Welcome page if login is successful
        if (response.ok && data.token) {
          // Save the token to localStorage
        localStorage.setItem("token", JSON.stringify({ token: data.token }));
        console.log("Token saved to localStorage:", data.token);

          navigate("/main"); // Use navigate function
        }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="loginPage">
      <form onSubmit={handleSubmit} className="loginForm">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
