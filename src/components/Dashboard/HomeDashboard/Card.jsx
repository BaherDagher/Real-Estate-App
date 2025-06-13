import React from 'react'
import Paper from '@mui/material/Paper';
import { Box, Stack, Typography } from '@mui/material'
import { ResponsivePie } from '@nivo/pie'


export default function Card({ icon, title, subTitle, data, percentage }) {
    return (
        <Paper sx={{ flexGrow: 1, minWidth: "333px", p: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Stack gap={1} className='text-center' alignItems={'center'} justifyContent={'center'}>
                <div>
                    {icon}
                </div>
                <Typography variant='body1'>
                    {title}
                </Typography>
                <Typography variant='body1'>
                    {subTitle}
                </Typography>
            </Stack>
            <Stack alignItems={'center'}>
                <Box height={'85px'} width={'85px'} >
                    <ResponsivePie
                        data={data}
                        margin={{ top: 10, right: 0, bottom: 10, left: 0 }}
                        innerRadius={0.7}
                        colors={{ scheme: 'category10' }}
                        padAngle={0.7}
                        cornerRadius={2}
                        activeOuterRadiusOffset={8}
                        borderWidth={1}
                        borderColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    0.2
                                ]
                            ]
                        }}
                        enableArcLinkLabels={false}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor="#333333"
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsColor={{ from: 'color' }}
                        enableArcLabels={false}
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    2
                                ]
                            ]
                        }}
                        isInteractive={false}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                            }
                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'ruby'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'c'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'go'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'python'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'scala'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'lisp'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'elixir'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'javascript'
                                },
                                id: 'lines'
                            }
                        ]}

                    />
                </Box>
                <Typography variant='body1'>
                    {percentage}
                </Typography>
            </Stack>
        </Paper>)
}
