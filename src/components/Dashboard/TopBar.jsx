import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box, Stack } from '@mui/material';

import Button from '@mui/material/Button';

import { useContext } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useTheme } from '@emotion/react';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { ThemeContext } from '../../context/ThemeContextProvider';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function TopBar({ open, handleDrawerOpen }) {

    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const theme = useTheme();
    const navigate = useNavigate();

    const drawerWidth = 240;
    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    return (
        <>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {
                                marginRight: 5,
                            },
                            open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box flexGrow={1} />

                    <Stack direction="row" alignItems="center" spacing={2}>
                        <IconButton
                            onClick={toggleTheme}
                            sx={{ color: theme.palette.text.primary }}
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                        </IconButton>

                        <LogoutButton />
                    </Stack>
                </Toolbar>
            </AppBar>
            <ToastContainer position="top-right" autoClose={1000} theme={isDarkMode ? 'dark' : 'light'} />
        </>
    );
}