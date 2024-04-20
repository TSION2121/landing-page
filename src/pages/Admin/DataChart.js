// src/components/DataChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DataChart = ({ data, parameter }) => {
    // Function to group data by CGPA ranges and count
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

    // Function to group data by parameter and count
    const groupByParameter = (data, parameter) => {
        return data.reduce((acc, curr) => {
            let key = curr[parameter];
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});
    };

    // Prepare the chart data based on the parameter
    let chartData;
    if (parameter === 'cgpa') {
        const groupedData = groupByCgpaRange(data);
        chartData = {
            labels: Object.keys(groupedData),
            datasets: [{
                label: 'Number of Students',
                data: Object.values(groupedData),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderWidth: 1,
            }],
        };
    } else {
        const groupedData = groupByParameter(data, parameter);

        if(parameter ==='gender')
        chartData = {
            labels: Object.keys(groupedData),
            datasets: [{
                label: `Students ${parameter} Count  `,
                data: Object.values(groupedData),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderWidth: 1,
            }],
        };
        if(parameter ==='department')
            chartData = {
                labels: Object.keys(groupedData),
                datasets: [{
                    label: `No of Students by ${parameter}`,
                    data: Object.values(groupedData),
                    backgroundColor: 'rgb(63,164,253)',
                    borderWidth: 1,
                }],
            };
    }

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>{`Distribution by ${parameter}`}</h2>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default DataChart;
