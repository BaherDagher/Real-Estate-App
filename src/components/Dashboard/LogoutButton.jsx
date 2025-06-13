import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Button from '@mui/material/Button';
import { useTheme } from "@emotion/react";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  return (
    <Button
      onClick={handleLogout}
      variant="contained"
      sx={{
        padding: '8px 10px',
        borderRadius: '10px',
        textTransform: 'none',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;