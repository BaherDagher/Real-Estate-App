import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContextProvider";
import { primaryColor } from "../../../theme";
import { Typography } from "@mui/material";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const { isDarkMode } = useContext(ThemeContext);
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    let hasError = false;
    const newErrors = { email: "", password: "" };
    setLoginError("");

    if (!email) {
      newErrors.email = "Email is required";
      hasError = true;
    }
    if (!password) {
      newErrors.password = "Password is required";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    try {
      const user = await login(email, password);

      if (user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("Login failed:", err.message);
      setLoginError("Invalid email or password. Please try again.");
    }
  };

  const inputStyle = {
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
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

  const errorStyle = {
    color: "red",
    fontWeight: "bold",
    fontSize: "13.5px",
    marginBottom: "10px",
  };

  const signupTextContainerStyle = {
    marginTop: "15px",
    textAlign: "center",
    fontSize: "14px",
  };

  const signupLinkStyle = () => ({
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: "15px",
    textDecoration: "none",
  });

  return (
    <div
      style={{
        display: "flex",
        height: "calc(100vh - 250px)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
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
        <h3>Login</h3>

        {loginError && (
          <div style={{ color: "red", fontWeight: "bold", marginBottom: 12 }}>
            {loginError}
          </div>
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={inputStyle}
        />
        {errors.email && <span style={errorStyle}>{errors.email}</span>}

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={inputStyle}
        />
        {errors.password && <span style={errorStyle}>{errors.password}</span>}

        <button type="submit" style={buttonStyle}>
          Login
        </button>

        <div style={signupTextContainerStyle}>
          Don’t have an account?{" "}
          <Link to="/register" style={signupLinkStyle(theme)}>
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
