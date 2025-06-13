import React from 'react';
import { Stack, useTheme } from '@mui/material';
import Card from './Card';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import SellIcon from '@mui/icons-material/Sell';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MessageIcon from '@mui/icons-material/Message';
import { data1, data2, data3, data4 } from '../HomeDashboard/Data'


export default function Row1({ allProperties, saleCount, rentCount, messagesCount }) {
    const theme = useTheme();

    return (
        <Stack
            direction="row"
            flexWrap="wrap"
            gap={2}
            justifyContent={{ xs: 'center', sm: 'space-between' }}
        >
            <Card
                icon={<HomeWorkIcon sx={{ color: theme.palette.primary.dark }} />}
                title={allProperties.length}
                subTitle="Total Properties"
                percentage={'+18%'}
                data={data1}
            />
            <Card
                icon={<SellIcon sx={{ color: theme.palette.primary.dark }} />}
                title={saleCount}
                subTitle="For Sale"
                percentage={'+25%'}
                data={data2}
            />
            <Card
                icon={<MeetingRoomIcon sx={{ color: theme.palette.primary.dark }} />}
                title={rentCount}
                subTitle="For Rent"
                percentage={'+7%'}
                data={data3}
            />
            <Card
                icon={<MessageIcon sx={{ color: theme.palette.primary.dark }} />}
                title={messagesCount}
                subTitle="Messages"
                percentage={'+48%'}
                data={data4}
            />
        </Stack>
    );
}