import React, {useEffect, useState} from 'react';
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
import {useSelector} from "react-redux";
import axios from "axios";
import {baseUrl} from "../../api/config";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const BarChart = () => {
    const [result,setResult] = useState([]);
    const token  = useSelector(state => state.user.token)
    useEffect(() =>{
        axios.get(`${baseUrl}/dashboard/monthly-data`,{
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) =>{
            setResult(res.data.data)
            console.log("res",res.data.data)
        }).catch((err) =>{
            console.log(err)
        })
    },[])
    const labels = [];
    for (let i=result.length-1;i>=0; i--){
        labels.push(result[i].month)
    }
    const expensesData = result.map(item => item.expenses);
    const incomeData = result.map(item => item.income);

    const data = {
        labels,
        datasets: [
            {
                label: 'Expenses',
                data: expensesData,
                backgroundColor: '#63ABFD',
                borderColor: '#165BAA', // Border color for "expenses" bar
                borderWidth: 3,
                borderRadius: 8
            },
            {
                label: 'Income',
                data: incomeData,
                backgroundColor: '#003380',
                borderColor: '#63ABFD', // Border color for "expenses" bar
                borderWidth: 3,
                borderRadius: 20
            },
        ],
    };

    result.forEach((item) => {
        const index = labels.indexOf(item.month);
        if (index !== -1) {
            data.datasets[0].data[index] = item.expenses;
            data.datasets[1].data[index] = item.income;
        }
    });

    const maxDataValue = Math.max(...expensesData, ...incomeData);
    const stepSize = Math.ceil(maxDataValue / 5 / 500) * 500;
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
                    stepSize: stepSize,
                    callback: (value) => {
                        if (value === 0) return value.toString();
                        const number = value / 1000;
                        if (number >= 1) {
                            return number.toString() + 'K';
                        }
                        return '';
                    },
                },
            },
        },
    };


    return <Bar options={options} data={data} />;
};

export default BarChart;
