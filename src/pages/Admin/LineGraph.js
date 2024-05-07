import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineGraph = () => {
    const chartData = {
        labels: ['Software', 'Electrical', 'Mechanical', 'Chemical', 'Architecture'],
        datasets: [
            {
                label: 'Students Visits',
                data: [65, 59, 80, 81, 56],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Total number of users',
            },
        },
    };

    return (
        <div>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default LineGraph;
