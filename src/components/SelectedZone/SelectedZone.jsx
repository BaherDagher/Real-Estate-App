import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RealEstateContext } from '../../context/RealEstateContextProvider';
import { useContext } from 'react';
import { useState } from 'react';
import PropertyCard from '../PropertyCard/PropertyCard';
import { Box, Typography } from '@mui/material';
import Loader from '../Loader/Loader';

const SelectedZone = () => {

    const [filteredSaleProperties, setFilteredSaleProperties] = useState([]);
    const [filteredRentProperties, setFilteredRentProperties] = useState([]);

    const { district } = useParams();

    const { allProperties } = useContext(RealEstateContext);


    const setSelectedZoneData = () => {

        if (!allProperties || allProperties.length === 0) return;

        const sale = allProperties.filter(
            (property) =>
                property.district === district && property.for_rent === false
        );

        const rent = allProperties.filter(
            (property) =>
                property.district === district && property.for_rent === true
        );

        setFilteredSaleProperties(sale);
        setFilteredRentProperties(rent);
    }

    useEffect(() => {
        setSelectedZoneData()
    }, [allProperties, district]);



    if (filteredSaleProperties.length === 0 && filteredRentProperties.length === 0) {
        return <Loader />;
    }

    return (
        <>
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
                    fontSize: { xs: '28px', sm: '30px', md: '2.5rem' },
                }}
            >
                {district} Sale Properties
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: {
                        xs: 'center',
                        sm: 'center',
                        md: 'flex-start'
                    },
                    flexWrap: 'wrap',
                    backgroundColor: 'background.default',
                    px: { xs: 2, sm: 3, md: 5, lg: 8 },
                    gap: 4
                }}
            >
                {
                    filteredSaleProperties.map((property) => (
                        <Box
                            key={property.id}
                            sx={{
                                flex: {
                                    xs: '0 0 100%',
                                    sm: '0 0 48%',
                                    md: '0 0 calc(100%/3 - 32px)', // 4 * 8 = 32px 
                                },
                                boxSizing: 'border-box',
                                my: 1,
                                overflow: 'hidden',
                                borderRadius: 2,
                                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                            }}>
                            <PropertyCard property={property} />
                        </Box >
                    ))
                }
            </Box >
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
                    fontSize: { xs: '28px', sm: '30px', md: '2.5rem' },
                }}
            >
                {district} Rent Properties
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: {
                        xs: 'center',
                        sm: 'center',
                        md: 'flex-start'
                    },
                    flexWrap: 'wrap',
                    backgroundColor: 'background.default',
                    px: { xs: 2, sm: 3, md: 5, lg: 8 },
                    gap: 4
                }}
            >
                {
                    filteredRentProperties.map((property) => (
                        <Box
                            key={property.id}
                            sx={{
                                flex: {
                                    xs: '0 0 100%',
                                    sm: '0 0 45%',
                                    md: '0 0 calc(100%/3 - 32px)', // 4 * 8 = 32px 
                                },
                                boxSizing: 'border-box',
                                my: 1,
                                overflow: 'hidden',
                                borderRadius: 2,
                                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                            }}>
                            <PropertyCard property={property} />
                        </Box >
                    ))
                }
            </Box >
        </>
    );
}

export default SelectedZone;
