import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const teamMembers = [
    { name: 'Alice', title: 'Developer' },
    { name: 'Bob', title: 'Designer' },
    { name: 'Charlie', title: 'Product Manager' },
    // ...other team members
];

export default function TeamSeating() {
    return (
        <Grid container spacing={2}>
            {teamMembers.map((member, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6">{member.name}</Typography>
                        <Typography variant="subtitle1">{member.title}</Typography>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
}
