import React, { useContext, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Divider,
    Button,
} from '@mui/material';
import { ContactContext } from '../../context/ContactUsContextProvider';
import { useTheme } from '@emotion/react';

const Messages = () => {
    const { contactMessages, removeContactMessage } = useContext(ContactContext);
    const theme = useTheme();

    const labelWidth = "80px";
    const Row = ({ label, value }) => (
        <Box sx={{ display: "flex", mb: 1 }}>
            <Box sx={{ minWidth: labelWidth }}>
                <Typography variant="body1" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                    {label}
                </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                {value}
            </Typography>
        </Box>
    );
    useEffect(() => {

    }, [contactMessages]);

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            {contactMessages.length === 0 ? (
                <Box sx={{ marginTop: 5 }}>
                    < Typography
                        variant="h5"
                        sx={{ my: 3, color: theme.palette.text.primary, fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase' }}
                    >
                        No messages available.
                    </Typography>
                </Box >
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                    }}
                >
                    {contactMessages.map((msg) => (
                        <Paper
                            key={msg.id}
                            elevation={3}
                            sx={{
                                p: 2,
                                width: '100%',
                            }}
                        >
                            <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h6" color="primary">
                                    {msg.subject}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#d32f2f',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: 4,
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => removeContactMessage(msg)}
                                >
                                    Remove
                                </Button>
                            </Box>

                            <Divider sx={{ mb: 1 }} />
                            <Row label="Name:" value={msg.name} />
                            <Row label="Email:" value={msg.email} />
                            <Row label="Phone:" value={msg.phone} />
                            <Row
                                label="Date:"
                                value={new Date(msg.dateSent).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                }) + ' - ' + new Date(msg.dateSent).toLocaleDateString('en-GB')}
                            />
                            <Row label="Message:" value={msg.message} />

                        </Paper>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default Messages;