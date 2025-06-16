import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { primaryColor } from '../../../theme';

const Loader = () => {
    return (
        <Box
            sx={{
                height: 'calc(100vh - 100px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
            }}
        >
            <HomeIcon sx={{ fontSize: 60, mb: 2, color: primaryColor }} />
            <CircularProgress color={primaryColor} />
            <Typography variant="h6" sx={{ mt: 2 }}>
                Loading properties...
            </Typography>
        </Box>
    );
};

export default Loader;