import React, { useMemo } from 'react';
import { useContext } from 'react';
import { ZonesContext } from '../../context/ZonesContextProvider';
import ZoneCard from '../ZoneCard/ZoneCard';
import { Box, Typography } from '@mui/material';


const Zones = () => {

    const { zonesList } = useContext(ZonesContext)

    const zoneCards = useMemo(() => {
        return zonesList.map((zone) => (
            <Box
                key={zone.id}
                sx={{
                    flex: {
                        xs: '0 0 100%',
                        sm: '0 0 48%',
                        md: '0 0 calc(33.333% - 8px)',
                    },
                    boxSizing: 'border-box',
                    mx: 'auto',
                    my: 1,
                }}
            >
                <ZoneCard zone={zone} />
            </Box>
        ))
    }, [zonesList]);


    return (
        <>
            <Box sx={{ mb: 10 }}>
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
                    Explore Zones
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
                        px: { xs: 5, sm: 3, md: 5, lg: 8 },
                        gap: 1
                    }}
                >
                    {
                        zoneCards
                    }
                </Box>
            </Box>

        </>
    );
}

export default Zones;
