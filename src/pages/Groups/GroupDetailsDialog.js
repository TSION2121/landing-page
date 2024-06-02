// Import necessary components
import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';

// This is your new component to display group details
export  default function GroupDetailsDialog({ group, open, onClose }) {
    // Here you can fetch more detailed data about the group
    // For now, I'll just display the existing data

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{group.name}</DialogTitle>
            <DialogContent>
                <Typography variant="h6">Project Title: {group.projectTitle}</Typography>
                <Typography variant="body1">Advisor: {group.advisor}</Typography>
                <Typography variant="body1">Status: {group.status}</Typography>
                {/* Add more fields as necessary */}
            </DialogContent>
        </Dialog>
    );
}
