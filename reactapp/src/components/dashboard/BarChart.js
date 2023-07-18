import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const BarChart = () => {
    const dataList = [
        // Example data for January and February
        {
            id:1,
            month: "January",
            expenses: 1000,
            income: 2000,
        },
        {
            id:2,
            month: "February",
            expenses: 1200,
            income: 1800,
        },
        // Add more months as needed
    ];
    const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Expenses',
                data: labels.map(() => 0),
                backgroundColor: '#63ABFD',
                borderColor: '#165BAA', // Border color for "expenses" bar
                borderWidth: 3,
                borderRadius: 8
            },
            {
                label: 'Income',
                data: labels.map(() => 1),
                backgroundColor: '#003380',
                borderColor: '#63ABFD', // Border color for "expenses" bar
                borderWidth: 3,
                borderRadius: 20
            },
        ],
    };

    dataList.forEach((item) => {
        const index = labels.indexOf(item.month);
        if (index !== -1) {
            data.datasets[0].data[index] = item.expenses;
            data.datasets[1].data[index] = item.income;
        }
    });

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                ticks: {
                    stepSize: 500,
                    callback: (value) => {
                        if (value === 500) return '500';
                        if (value === 1000) return '1000';
                        if (value === 5000) return '5000';
                        if (value === 10000) return '10000';
                        if (value === 20000) return '20000';
                        return '';
                    },
                },
            },
        },
    };


    return <Bar options={options} data={data} />;
};

export default BarChart;
