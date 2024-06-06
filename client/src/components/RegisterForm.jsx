import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate hook
import "../css/RegisterPage.css";
import "../index.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
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
        "https://secret-bayou-22282-49e42fb604f5.herokuapp.com/api/auth/register",
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

      // Redirect to Welcome page if registration is successful
      if (response.ok) {
        navigate("/"); // Use navigate function
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="registerPage">
      <form onSubmit={handleSubmit} className="registrationForm">
        <div className="input-items">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="input-field"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-items">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="input-field"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="input-items">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="input-field"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <p className="linkTo">
          Already have an account? <Link to="/login">Log in here.</Link>
        </p>
        <button type="submit" className="submitBtn">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
