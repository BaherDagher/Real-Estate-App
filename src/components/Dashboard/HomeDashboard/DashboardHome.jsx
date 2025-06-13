import React, { useContext } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import Row1 from './Row1.jsx';  // Import the Row1 component you have
import { RealEstateContext } from '../../../context/RealEstateContextProvider';
import { ContactContext } from '../../../context/ContactUsContextProvider';
import Row2 from './Row2.jsx';
import Row3 from './Row3.jsx';

export default function DashboardHome() {
    const { allProperties } = useContext(RealEstateContext);
    const { contactMessages } = useContext(ContactContext);

    const saleCount = allProperties.filter(p => !p.for_rent).length;
    const rentCount = allProperties.filter(p => p.for_rent).length;
    const messagesCount = contactMessages.length;

    return (
        <Box
            sx={{
                bgcolor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >

            {/* Top KPIs Row */}
            <Row1
                allProperties={allProperties}
                saleCount={saleCount}
                rentCount={rentCount}
                messagesCount={messagesCount}
            />

            <Divider />

            <Row2 />
            <Divider />
            <Row3 />

        </Box>
    );
}