import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate instead of useHistory
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
        console.log("Email to be saved:", formData.email); // Add this line
        // Save the token to localStorage
        localStorage.setItem("token", JSON.stringify({ token: data.token }));
         localStorage.setItem("email", JSON.stringify({ email: formData.email})); // Assuming email is the username
         console.log("Email saved to localStorage:", formData.email);
        console.log("Token saved to localStorage:", data.token);

        navigate("/"); // Use navigate function
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="loginPage">
      <form onSubmit={handleSubmit} className="loginForm">
        <div className="input-items">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="input-field"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-items">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="input-field"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <p className="linkTo">
          First time visiting? <Link to="/register">Create an account</Link> to
          join us.
        </p>
        <button type="submit" className="submitBtn">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
