import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { scroller } from 'react-scroll';

import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Badge,
    useTheme,
} from '@mui/material';

import LocationCityIcon from '@mui/icons-material/LocationCity';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import { ThemeContext } from '../../context/ThemeContextProvider';
import { FavouritesContext } from '../../context/FavouritesContextProvider';
import { AuthContext } from '../../context/AuthContext';
import { ToastContainer } from 'react-toastify';
import { hoverColor, primaryColor } from '../../../theme';

const Navbar = () => {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const theme = useTheme();
    const { favouriteList } = useContext(FavouritesContext);
    const { currentUser, logout } = useContext(AuthContext);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('home');

    const navigate = useNavigate();
    const location = useLocation();

    // Styling NavLink active/inactive
    const navLinkStyle = ({ isActive }) => ({
        textDecoration: isActive ? 'underline' : 'none',
        color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
        fontSize: 18,
        cursor: 'pointer',
    });

    // Scroll to contact section handler
    const handleScrollToContact = () => {
        setActiveLink('contact');
        if (location.pathname !== '/') {
            navigate('/', { replace: false });
            setTimeout(() => {
                scroller.scrollTo('contactSection', {
                    duration: 900,
                    delay: 0,
                    smooth: 'easeInOutQuart',
                });
            }, 500);
        } else {
            scroller.scrollTo('contactSection', {
                duration: 800,
                delay: 0,
                smooth: 'easeInOutQuart',
            });
        }
    };

    // Sync activeLink with current path on navigation changes
    useEffect(() => {
        if (location.pathname === '/') {
            if (activeLink !== 'contact') {
                setActiveLink('home');
            }
        } else {
            switch (location.pathname) {
                case '/search':
                    setActiveLink('search');
                    break;
                case '/favourites':
                    setActiveLink('favourites');
                    break;
                case '/login':
                case '/register':
                    setActiveLink('');
                    break;
                default:
                    setActiveLink('');
            }
        }
    }, [location.pathname]);

    // Drawer top with login/register or user info + logout (no dark mode toggle here)
    const drawerTopBar = (
        <Box
            sx={{
                px: 2,
                py: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {currentUser ? (
                    <>
                        <Typography sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                            {currentUser.name}
                        </Typography>
                        <Typography
                            onClick={() => {
                                logout();
                                setDrawerOpen(false);
                            }}
                            sx={{
                                color: 'white',
                                cursor: 'pointer',
                                border: '1px solid',
                                borderRadius: '10px',
                                px: 1,
                                py: 0.2,
                                userSelect: 'none',
                                fontSize: '0.9rem',
                                padding: '5px 10px',
                                backgroundColor: primaryColor,
                                '&:hover': {
                                    backgroundColor: hoverColor,
                                },
                            }}
                        >
                            Logout
                        </Typography>
                    </>
                ) : (
                    <>
                        <NavLink
                            to="/login"
                            onClick={() => setDrawerOpen(false)}
                            style={{ ...navLinkStyle({ isActive: location.pathname === '/login' }) }}
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            onClick={() => setDrawerOpen(false)}
                            style={{ ...navLinkStyle({ isActive: location.pathname === '/register' }) }}
                        >
                            Register
                        </NavLink>
                    </>
                )}
            </Box>
        </Box>
    );

    // Drawer menu links (no dark mode toggle inside)
    const drawerLinks = (
        <Box
            sx={{ width: 240 }}
            role="presentation"
            onClick={() => setDrawerOpen(false)}
            onKeyDown={() => setDrawerOpen(false)}
        >
            {drawerTopBar}
            <List>
                <ListItem button component={NavLink} to="/" style={navLinkStyle}>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={NavLink} to="/search" style={navLinkStyle}>
                    <ListItemText primary="Search" />
                </ListItem>
                {currentUser && (
                    <ListItem button component={NavLink} to="/favourites" style={navLinkStyle}>
                        <ListItemText primary="Favourites" />
                    </ListItem>
                )}
                <ListItem button>
                    <button
                        onClick={handleScrollToContact}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: 'transparent',
                            border: 'none',
                            fontSize: '18px',
                            fontWeight: 400,
                            color: theme.palette.text.primary,
                            fontFamily: "Times, 'Times New Roman', serif",
                            paddingLeft: 0,
                            marginLeft: 0,
                            width: '100%',
                            textAlign: 'left',

                        }}
                    >
                        Contact Us
                    </button>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <Box sx={{ marginBottom: 8 }}>
                <AppBar
                    position="fixed"
                    sx={{
                        left: 0,
                        right: 0,
                        top: 0,
                        zIndex: '999',
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.background.default,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                        px: { xs: 2, sm: 3, md: 5, lg: 8 },
                    }}
                >
                    <Toolbar
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        {/* Logo / Title */}
                        <Box
                            onClick={() => {
                                setActiveLink('home');
                                if (location.pathname === '/') {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                } else {
                                    navigate('/');
                                }
                            }}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                minWidth: '150px',
                                textDecoration: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            <LocationCityIcon
                                sx={{
                                    color: theme.palette.primary.main,
                                    fontSize: '40px',
                                    mr: 1,
                                    position: 'relative',
                                    top: '-3px',
                                }}
                            />
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    fontWeight: 'bold',
                                    letterSpacing: '2px',
                                    color: theme.palette.text.primary,
                                    fontSize: { xs: 16, md: 20 },
                                }}
                            >
                                Real Estate
                            </Typography>
                        </Box>

                        {/* Desktop nav links */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
                            <NavLink
                                to="/"
                                style={() => navLinkStyle({ isActive: activeLink === 'home' })}
                                onClick={() => {
                                    setActiveLink('home');
                                    if (location.pathname === '/') {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }
                                }}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/search"
                                style={() => navLinkStyle({ isActive: activeLink === 'search' })}
                                onClick={() => setActiveLink('search')}
                            >
                                Search
                            </NavLink>
                            {currentUser && (
                                <Badge badgeContent={favouriteList.length || '0'} color="primary">
                                    <NavLink
                                        to="/favourites"
                                        style={() => navLinkStyle({ isActive: activeLink === 'favourites' })}
                                        onClick={() => setActiveLink('favourites')}
                                    >
                                        Favourites
                                    </NavLink>
                                </Badge>
                            )}
                            <button
                                onClick={() => {
                                    setActiveLink('contact');
                                    handleScrollToContact();
                                }}
                                style={{
                                    ...navLinkStyle({ isActive: activeLink === 'contact' }),
                                    cursor: 'pointer',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    fontSize: '18px',
                                    fontWeight: 400,
                                    fontFamily: "Times, 'Times New Roman', serif",
                                    textDecoration: activeLink === 'contact' ? 'underline' : 'none',
                                    textDecorationColor: theme.palette.primary.main,
                                    marginTop: 2,
                                    marginLeft: -3
                                }}
                            >
                                Contact Us
                            </button>
                        </Box>

                        {/* Desktop login/register or user & logout */}
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                alignItems: 'center',
                                gap: 2,
                                ml: 3,
                            }}
                        >
                            {!currentUser && (
                                <>
                                    <NavLink
                                        to="/login"
                                        style={{ ...navLinkStyle({ isActive: location.pathname === '/login' }) }}
                                    >
                                        Login
                                    </NavLink>
                                    <NavLink
                                        to="/register"
                                        style={{ ...navLinkStyle({ isActive: location.pathname === '/register' }) }}
                                    >
                                        Register
                                    </NavLink>
                                </>
                            )}
                            {currentUser && (
                                <>
                                    <Typography sx={{ color: theme.palette.text.primary }}>
                                        {currentUser.name}
                                    </Typography>
                                    <Typography
                                        onClick={logout}
                                        sx={{
                                            color: 'white',
                                            cursor: 'pointer',
                                            border: '1px solid',
                                            borderRadius: '10px',
                                            px: 1,
                                            py: 0.2,
                                            userSelect: 'none',
                                            fontSize: '0.9rem',
                                            padding: '5px 10px',
                                            backgroundColor: primaryColor,
                                            '&:hover': {
                                                backgroundColor: hoverColor,
                                            },
                                        }}
                                    >
                                        Logout
                                    </Typography>
                                </>
                            )}
                            {/* Dark mode toggle on desktop (far right) */}
                            <IconButton
                                onClick={toggleTheme}
                                sx={{ color: theme.palette.text.primary, ml: 1 }}
                                aria-label="Toggle dark mode"
                            >
                                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                            </IconButton>
                        </Box>

                        {/* Mobile right side icons */}
                        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                            {/* Dark mode toggle before menu */}
                            <IconButton
                                onClick={toggleTheme}
                                sx={{ color: theme.palette.text.primary, mr: 1 }}
                                aria-label="Toggle dark mode"
                            >
                                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                            </IconButton>

                            {/* Hamburger menu icon */}
                            <IconButton
                                onClick={() => setDrawerOpen(true)}
                                sx={{ color: theme.palette.text.primary }}
                                aria-label="Open menu"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Drawer for mobile menu */}
                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    PaperProps={{ sx: { backgroundColor: theme.palette.background.default } }}
                >
                    {drawerLinks}
                </Drawer>
            </Box>
            <ToastContainer position="top-right" autoClose={1000} theme={isDarkMode ? 'dark' : 'light'} />
        </>
    );
};

export default Navbar;