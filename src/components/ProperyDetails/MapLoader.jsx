import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const MapLoader = () => {
    return (
        <Box
            sx={{
                height: 400,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
                bgcolor: '#f5f5f5',
            }}
        >
            <CircularProgress />
            <Typography variant="body1" sx={{ mt: 2 }}>
                Loading map...
            </Typography>
        </Box>
    );
};

export default MapLoader;