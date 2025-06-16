import { Box, Typography } from '@mui/material';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const HeroImage = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: {
                    xs: '400px', sm: '600px', md: '700px'
                },
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: -1
            }}
        >
            <LazyLoadImage
                alt="Hero Background"
                src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg"
                effect="blur"
                width="100%"
                height="100%"
                wrapperProps={{
                    style: {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                        zIndex: 0,
                        transitionDelay: '125ms',
                    }
                }}
                style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7))',
                    zIndex: 1,
                }}
            />

            <Typography
                variant="h3"
                sx={{
                    color: '#fff',
                    zIndex: 2,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    px: 2,
                    animation: 'fadeIn 2s ease-in-out',
                    fontSize: { xs: 22, sm: 30, md: 35, lg: 45 }
                }}
            >
                Your Future Home Is Right Here
            </Typography>
        </Box>
    );
};

export default HeroImage;