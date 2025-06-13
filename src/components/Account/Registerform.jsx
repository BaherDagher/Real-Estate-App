import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContextProvider";
import { primaryColor } from "../../../theme";

const RegisterForm = () => {

  const { register } = useContext(AuthContext);
  const { isDarkMode } = useContext(ThemeContext);
  const theme = useTheme();
  const navigate = useNavigate();



  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
    role: "user",
  });

  const [errors, setErrors] = useState({
    general: "",
    passwordMismatch: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, repassword } = formData;

    if (!name || !email || !password || !repassword) {
      setErrors({ ...errors, general: "All fields are required." });
      return;
    }

    if (password !== repassword) {
      setErrors({ ...errors, passwordMismatch: "Passwords do not match." });
      return;
    }

    try {
      await register({
        name,
        email,
        password,
        role: "user",
      });
      navigate("/home");
    } catch (err) {
      setErrors({ ...errors, general: err.message });
    }
  };

  const inputStyle = {
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
    backgroundColor: theme.palette.background.paper
  };

  const buttonStyle = {
    padding: "10px",
    backgroundColor: primaryColor,
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  };

  const ruleStyle = {
    fontSize: "12px",
    color: "gray",
    marginBottom: "10px",
    lineHeight: 1.4,
  };

  const errorStyle = {
    fontSize: "12px",
    color: "red",
    marginBottom: "10px",
  };


  return (
    <div
      style={{
        display: "flex",
        height: "calc(100vh - 250px)",
        justifyContent: "center",
        alignItems: "center",
        background: theme.palette.background.default,
      }}
    >
      <form
        onSubmit={handleRegister}
        style={{
          backgroundColor: theme.palette.background.paper,
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          width: "300px",
          display: "flex",
          flexDirection: "column",
          color: theme.palette.text.primary,

        }}
      >
        <h3>Register</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="password"
          name="repassword"
          placeholder="Repeat Password"
          onChange={handleChange}
          style={inputStyle}
        />
        <span style={ruleStyle}>
          Password must contain at least 8 characters, including one uppercase letter, one number, and one special character.
        </span>
        {errors.passwordMismatch && (
          <span style={errorStyle}>{errors.passwordMismatch}</span>
        )}
        {errors.general && <span style={errorStyle}>{errors.general}</span>}

        <button type="submit" style={buttonStyle}>
          Register
        </button>
      </form>
    </div>
  );
};


export default RegisterForm;
