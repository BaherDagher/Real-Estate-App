import React from 'react';
import { Box, Typography, Link, useTheme } from '@mui/material';

export default function Footer() {

    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: theme.palette.background.paper,
                py: 2,
                textAlign: 'center',
                position: "static",
                left: 0,
                right: 0,
                bottom: 0,
                boxShadow: theme.shadows[2]
                , mt: 3
            }}
        >
            <Typography variant="body2" color={theme.palette.text.primary}>
                Copyright Real Estate © 2025 | Made By Team
                {/* <Link
                    href="https://www.facebook.com/Baher.Osama.Farouk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: theme.palette.primary.main, ml: 0.5, textDecoration: 'underline', '&:hover': { color: theme.palette.primary.dark } }}
                >
                    Baher Dagher
                </Link> */}
            </Typography>
        </Box >
    );
}