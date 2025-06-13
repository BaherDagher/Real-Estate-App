import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

export default function Row3() {
  return (
    <Box display="flex" justifyContent="space-between" gap={2}>
      {/* Progress Tracker */}
      <Card sx={{ flex: 1, minHeight: '100px' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontSize: '0.9rem' }}>
            Progress Tracker
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, fontSize: '0.8rem' }}>
            Weekly Goal Completion
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <CircularProgress
              variant="determinate"
              value={75}
              size={50}
              color="primary"
            />
            <Typography variant="h4" sx={{ fontSize: '1.2rem' }}>
              75%
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mt: 2, fontSize: '0.8rem' }}>
            Keep up the good work! You are on track to meet your goals this
            week.
          </Typography>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card sx={{ flex: 1, minHeight: '180px' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontSize: '0.9rem' }}>
            Notifications
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primaryTypographyProps={{ fontSize: '0.8rem' }}
                secondaryTypographyProps={{ fontSize: '0.7rem' }}
                primary="Server Maintenance Scheduled"
                secondary="Tomorrow at 3:00 AM"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primaryTypographyProps={{ fontSize: '0.8rem' }}
                secondaryTypographyProps={{ fontSize: '0.7rem' }}
                primary="New User Signups"
                secondary="5 new signups today"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primaryTypographyProps={{ fontSize: '0.8rem' }}
                secondaryTypographyProps={{ fontSize: '0.7rem' }}
                primary="Security Alert"
                secondary="Unusual login detected"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card sx={{ flex: 2, minHeight: '180px' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontSize: '0.9rem' }}>
            Recent Activity
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '0.8rem' }}>User</TableCell>
                <TableCell sx={{ fontSize: '0.8rem' }}>Activity</TableCell>
                <TableCell sx={{ fontSize: '0.8rem' }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontSize: '0.8rem' }}>Mohamed Ali</TableCell>
                <TableCell sx={{ fontSize: '0.8rem' }}>Logged in</TableCell>
                <TableCell sx={{ fontSize: '0.8rem' }}>2025-06-10</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontSize: '0.8rem' }}>Yara Magdy</TableCell>
                <TableCell sx={{ fontSize: '0.8rem' }}>
                  New User
                </TableCell>
                <TableCell sx={{ fontSize: '0.8rem' }}>2025-06-09</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontSize: '0.8rem' }}>Tariq Al-Banna</TableCell>
                <TableCell sx={{ fontSize: '0.8rem' }}>
                  Changed password
                </TableCell>
                <TableCell sx={{ fontSize: '0.8rem' }}>2025-06-08</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}