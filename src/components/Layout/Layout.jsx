import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const Layout = () => {

    const theme = useTheme();
    return (
        <>
            <ScrollToTop />
            <Box sx={{
                backgroundColor: theme.palette.background.default
                , display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}>
                <Navbar />
                <Box sx={{ flexGrow: 1, justifySelf: 'start' }}>
                    <Outlet />
                </Box>
                <Footer />
            </Box >

        </>
    );
}

export default Layout;
