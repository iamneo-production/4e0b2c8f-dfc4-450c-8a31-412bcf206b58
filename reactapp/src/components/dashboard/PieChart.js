import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const PieChart = () => {
    const data = {
        labels: ['Food', 'Rent', 'Transportation', 'Entertainment', 'Utilities'],
        datasets: [
            {
                data: [5000, 3500, 1000, 200, 50],
                backgroundColor: [
                    '#C8DEFF',
                    '#6DA8FF',
                    '#247CFF',
                    '#0057DB',
                    '#0042A4',
                ],borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        aspectRatio: 2,
        plugins: {
            legend: {
                position: 'right',
            },
        }
    };

    return <Pie data={data} options={options} />
};

export default PieChart;
