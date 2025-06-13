import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Box
            sx={{
                height: '80vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                p: 3,
            }}
        >
            <ErrorOutlineIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
            <Typography variant="h4" gutterBottom>
                404 - Page Not Found
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
                Sorry, the page you are looking for does not exist.
            </Typography>
            <Button variant="contained" component={Link} to="/">
                Go to Home
            </Button>
        </Box>
    );
};

export default NotFound;