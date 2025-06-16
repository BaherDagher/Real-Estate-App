import { Box, Typography } from '@mui/material';
import React from 'react';
import ContactUsCard from '../ContactUsCard/ContactUsCard';

const Contactus = () => {
    return (
        <Box sx={{ mb: 10 }} id="contactus">
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    mb: 5,
                    mt: 6,
                    color: '#FF8000',
                    fontSize: { xs: '24px', sm: '30px', md: '2.5rem' },
                }}
            >
                Contact Us Today!
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: {
                        xs: 'center',
                        sm: 'center',
                        md: 'center'
                    }, flexWrap: 'wrap',
                    backgroundColor: 'background.default',
                    px: { xs: 5, sm: 3, md: 5, lg: 8 },
                    gap: 1
                }}
            >
                <ContactUsCard></ContactUsCard>
            </Box>
        </Box>
    );
}

export default Contactus;
