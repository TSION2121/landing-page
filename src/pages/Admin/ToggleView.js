import React from 'react';
import { ToggleButtonGroup, ToggleButton, Paper } from '@mui/material';

const ToggleView = ({ view, setView }) => {
    const handleViewChange = (event, nextView) => {
        if (nextView !== null) {
            setView(nextView);
        }
    };

    return (
        <Paper elevation={3} style={{ margin: '16px', padding: '8px' }}>
            <ToggleButtonGroup
                value={view}
                exclusive
                onChange={handleViewChange}
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                <ToggleButton value="table" style={{ width: '100px', margin: '0 8px' }}>
                    Table View
                </ToggleButton>
                <ToggleButton value="chart" style={{ width: '100px', margin: '0 8px' }}>
                    Chart View
                </ToggleButton>
            </ToggleButtonGroup>
        </Paper>
    );
};

export default ToggleView;
