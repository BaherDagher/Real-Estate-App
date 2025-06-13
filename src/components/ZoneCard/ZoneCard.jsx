import React from 'react';
import { Card, CardMedia, Box, Typography, CardActionArea } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';


const ZoneCard = React.memo(({ zone }) => {

    const districtImages = {
        'Maadi': 'https://images.pexels.com/photos/10059676/pexels-photo-10059676.jpeg',
        'Smouha': 'https://images.pexels.com/photos/15689844/pexels-photo-15689844/free-photo-of-residential-building-against-blue-sky.jpeg',
        'Sheikh Zayed': 'https://images.pexels.com/photos/31656146/pexels-photo-31656146/free-photo-of-modern-apartment-building-exterior.jpeg',
        'Heliopolis': 'https://images.pexels.com/photos/9152294/pexels-photo-9152294.jpeg',
        'New Cairo': 'https://images.pexels.com/photos/9962911/pexels-photo-9962911.jpeg',
        'Nasr City': 'https://images.pexels.com/photos/8676831/pexels-photo-8676831.jpeg',
        '6th October City': 'https://images.pexels.com/photos/14590388/pexels-photo-14590388.jpeg',
        'El Kawther': 'https://images.pexels.com/photos/18503064/pexels-photo-18503064/free-photo-of-balconies-of-an-apartment-building.jpeg',
        'Ain Sokhna': 'https://images.pexels.com/photos/20070349/pexels-photo-20070349/free-photo-of-modern-residential-building-with-balconies.jpeg'

    };

    const imageUrl = districtImages[zone.district] || 'https://images.pexels.com/photos/31656156/pexels-photo-31656156/free-photo-of-modern-urban-apartment-building-exterior.jpeg';

    return (
        <Box
            sx={{
                mx: 'auto',
                margin: { xs: 0, md: 2 },
                height: '300px',
            }}
        >
            <Card
                sx={{
                    height: '100%',
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >
                <CardActionArea
                    component={Link}
                    to={`/zone/${zone.district}`}
                    sx={{
                        height: '100%',
                        '&:hover .zoom-image': {
                            transform: 'scale(1.05)',
                        }
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden',
                        }}
                    >
                        <LazyLoadImage
                            alt={`${zone.district} background`}
                            src={imageUrl}
                            effect="blur"
                            width="100%"
                            height="100%"
                            className="zoom-image"
                            style={{
                                objectFit: 'cover',
                                width: '100%',
                                height: '100%',
                                transition: 'transform 0.5s ease-in-out',
                            }}
                        />

                        <Box
                            sx={{
                                position: 'absolute',
                                top: 'calc(50% - 40%)',
                                left: 'calc(50% - 40%)',
                                width: '80%',
                                height: '80%',
                                borderRadius: 2,
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.4))',
                                zIndex: 1,
                            }}
                        />

                        <Typography
                            variant="h3"
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                color: '#fff',
                                zIndex: 2,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                px: 0,
                                fontSize: { xs: 26, sm: 30, md: 35, lg: 28 }
                            }}
                        >
                            {zone.district},
                            <br />
                            {zone.city}
                        </Typography>
                    </Box>
                </CardActionArea>
            </Card>
        </Box>
    );

});

export default ZoneCard;
