import React from 'react';
import Slider from 'react-slick';
import PropertyCard from '../PropertyCard/PropertyCard';
import { useContext } from 'react';
import { RealEstateContext } from '../../context/RealEstateContextProvider.jsx';
import { Box, Typography } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeaturedToday = () => {

    const { allProperties } = useContext(RealEstateContext)

    if (!allProperties.length) return <Loader />

    const featuredProperites = allProperties.slice(30, 40);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows: true,
        swipe: true,
        draggable: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '0px',
                },
            },
        ],
    };

    return (
        <>

            <Box
                sx={{
                    px: { xs: 0, sm: 4, md: 8 },
                    mt: { xs: 6, sm: 8, md: 12 },
                    mb: { xs: 6, sm: 8, md: 12 },
                }}
            >
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
                    Featured Today
                </Typography>

                <Box sx={{ mb: 5, px: "4px" }}>
                    <Slider {...sliderSettings}>
                        {featuredProperites.map((property) => (
                            <Box
                                key={property.id}
                                sx={{
                                    px: 3,
                                    boxSizing: 'border-box',
                                }}
                            >
                                <PropertyCard property={property} />
                            </Box>
                        ))}
                    </Slider>
                </Box>
            </Box>
        </>
    );
}

export default FeaturedToday;