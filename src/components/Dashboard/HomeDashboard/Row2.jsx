import React, { useContext } from 'react';
import { Box, Paper, Stack, Typography, Card, CardContent, Divider, useTheme } from '@mui/material';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';
import { RealEstateContext } from '../../../context/RealEstateContextProvider';
import { ZonesContext } from '../../../context/ZonesContextProvider';

export default function Row2() {

    const { allProperties } = useContext(RealEstateContext);
    const { zonesList } = useContext(ZonesContext);
    const theme = useTheme();

    // Calculate properties per district
    const propertiesPerDistrict = zonesList.map(zone => {
        const count = allProperties.filter(
            prop => prop.location?.district === zone.district && prop.location?.city === zone.city
        ).length;

        return {
            name: `${zone.district}`,
            value: count,
        };
    }).filter(entry => entry.value > 0);

    return (
        <Stack direction="row" justifyContent="space-between" gap={2} flexWrap="wrap">

            {/* Chart Section */}
            <Paper sx={{ flexGrow: 1, minWidth: 500, height: 395, p: 2 }}>

                <Typography variant="h6" sx={{ mb: 2 }}>
                    Properties per District
                </Typography>

                <ResponsiveContainer width="90%" height="85%">
                    <BarChart
                        data={propertiesPerDistrict}
                        margin={{ top: 10, right: 10, left: 0, bottom: 50 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="name"
                            angle={-45}
                            textAnchor="end"
                            interval={0}
                            tick={{ fill: theme.palette.text.primary, fontSize: 12 }}
                        />
                        <YAxis
                            allowDecimals={false}
                            tick={{ fill: theme.palette.text.primary, fontSize: 12 }}
                        />
                        {/* Tooltip removed */}
                        <Bar dataKey="value" fill="#1976d2" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </Paper>

            {/* KPI Cards Section */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                    minWidth: 350,
                    flexGrow: 1,
                }}
            >
                {/* Card 1 */}
                <Card elevation={2} sx={{ height: 90 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ mb: 0.5, fontSize: '0.8rem' }}>
                            Total Revenue
                        </Typography>
                        <Typography variant="h4" color="primary" sx={{ mb: 0.5, fontSize: '1rem' }}>
                            $25,400
                        </Typography>
                        <Divider />
                        <Typography variant="body2" sx={{ mt: 0.5, fontSize: '0.7rem' }}>
                            Revenue increased by <b>15%</b> compared to last month.
                        </Typography>
                    </CardContent>
                </Card>

                {/* Card 2 */}
                <Card elevation={2} sx={{ height: 90 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ mb: 0.5, fontSize: '0.8rem' }}>
                            Active Users
                        </Typography>
                        <Typography variant="h4" color="secondary" sx={{ mb: 0.5, fontSize: '1rem' }}>
                            1,345
                        </Typography>
                        <Divider />
                        <Typography variant="body2" sx={{ mt: 0.5, fontSize: '0.7rem' }}>
                            User activity has remained steady, with a <b>3% increase</b> in daily active users.
                        </Typography>
                    </CardContent>
                </Card>

                {/* Card 3 */}
                <Card elevation={2} sx={{ height: 90 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ mb: 0.5, fontSize: '0.8rem' }}>
                            New Signups
                        </Typography>
                        <Typography variant="h4" color="success.main" sx={{ mb: 0.5, fontSize: '1rem' }}>
                            450
                        </Typography>
                        <Divider />
                        <Typography variant="body2" sx={{ mt: 0.5, fontSize: '0.7rem' }}>
                            <b>25%</b> higher than last week. Keep up the growth trend!
                        </Typography>
                    </CardContent>
                </Card>

                {/* Card 4 */}
                <Card elevation={2} sx={{ height: 90 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ mb: 0.5, fontSize: '0.8rem' }}>
                            Support Tickets
                        </Typography>
                        <Typography variant="h4" color="error.main" sx={{ mb: 0.5, fontSize: '1rem' }}>
                            75
                        </Typography>
                        <Divider />
                        <Typography variant="body2" sx={{ mt: 0.5, fontSize: '0.7rem' }}>
                            <b>10 new tickets</b> resolved this week. Ensure all pending tickets are addressed.
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Stack>
    );
}