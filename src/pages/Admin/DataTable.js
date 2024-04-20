// src/components/AggregatedDataTable.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AggregatedDataTable = ({ data, parameter }) => {
    // Helper function to group and count data by CGPA ranges
    const groupByCgpaRange = (data) => {
        const ranges = {
            '1.0-2.0': 0,
            '2.1-3.0': 0,
            '3.1-4.0': 0,
        };
        data.forEach((item) => {
            const cgpa = parseFloat(item.cgpa);
            if (cgpa >= 1.0 && cgpa <= 2.0) ranges['1.0-2.0']++;
            else if (cgpa > 2.0 && cgpa <= 3.0) ranges['2.1-3.0']++;
            else if (cgpa > 3.0 && cgpa <= 4.0) ranges['3.1-4.0']++;
        });
        return ranges;
    };

    // Helper function to group and count data by department or gender
    const groupByParameter = (data, parameter) => {
        return data.reduce((acc, curr) => {
            let key = curr[parameter];
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});
    };

    // Decide what to display based on the parameter
    let displayData;
    if (parameter === 'cgpa') {
        displayData = groupByCgpaRange(data);
    } else {
        displayData = groupByParameter(data, parameter);
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{parameter === 'cgpa' ? 'CGPA Range' : 'Category'}</TableCell>
                        <TableCell>Count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(displayData).map(([key, value]) => (
                        <TableRow key={key}>
                            <TableCell>{key}</TableCell>
                            <TableCell>{value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AggregatedDataTable;
