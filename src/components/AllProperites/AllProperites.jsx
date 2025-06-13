import React, { useMemo } from 'react';
import PropertyCard from '../PropertyCard/PropertyCard';
import { useContext } from 'react';
import { RealEstateContext } from '../../context/RealEstateContextProvider.jsx';
import { Box, Typography } from '@mui/material';

const AllProperites = () => {
    const { allProperties } = useContext(RealEstateContext)

    const propertyCards = useMemo(() => {
        return (
            allProperties.map((property) => (
                <Box
                    key={property.id}
                    sx={{
                        flex: {
                            xs: '0 0 100%',
                            sm: '0 0 45%',
                            md: '0 0 calc(100%/3 - 32px)', // 4 * 8 = 32px 
                        },
                        boxSizing: 'border-box',
                        mx: { xs: 'auto', md: '0' },
                        my: 1,
                        overflow: 'hidden',
                        borderRadius: 2,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                    }}>
                    <PropertyCard property={property} />
                </Box >
            ))
        )
    }, [allProperties]);

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
                All Properties
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: {
                        xs: 'center',
                        sm: 'center',
                        md: 'space-between'
                    }, flexWrap: 'wrap',
                    backgroundColor: 'background.default',
                    px: { xs: 2, sm: 3, md: 5, lg: 8 },
                    gap: 4
                }}
            >
                {propertyCards}
            </Box>
        </>
    );
}

export default AllProperites;
