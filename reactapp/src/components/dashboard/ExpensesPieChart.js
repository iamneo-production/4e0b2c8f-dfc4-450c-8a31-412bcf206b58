import React, {useEffect, useState} from 'react';
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
import {useSelector} from "react-redux";
import axios from "axios";
import {baseUrl} from "../../api/config";
import tinycolor from 'tinycolor2';
import {Grid, Skeleton} from "@mantine/core";
import {ReactComponent as NoDataSVG} from "../../assets/No-data-1.svg";

ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const ExpensesPieChart = (props) => {
    const [result,setResult] = useState([]);
    const [pieChartLoading,setPieChartLoading] = useState(false)
    let tempresult=[];
    const token  = useSelector(state => state.user.token)
    useEffect(() =>{
        setPieChartLoading(true)
        axios.get(`${baseUrl}/dashboard/this-month/expenses`,{
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) =>{
            setResult(res.data.data)
            setPieChartLoading(false)
            console.log("res",res.data.data)
        }).catch((err) =>{
            console.log(err)
            setPieChartLoading(false)
        })
    },[])
    console.log("ex",result)
    const labels = [];
    const expensesData = [];
    const colorPalette = ['#C8DEFF', '#6DA8FF', '#247CFF', '#0057DB', '#0042A4'];
    const colorCount = colorPalette.length;
    const MAX_CATEGORIES = 4;

    if (result.length > MAX_CATEGORIES) {
        const topCategories = result.slice(0, MAX_CATEGORIES);
        const otherCategories = result.slice(MAX_CATEGORIES);

        const otherExpensesSum = otherCategories.reduce(
            (sum, item) => sum + item.expenses,
            0
        );

        topCategories.push({ category: 'Others', expenses: otherExpensesSum });

        tempresult = topCategories;
    }else {
        tempresult = result
    }

    const data = {
        labels,
        datasets: [
            {
                data: expensesData,
                backgroundColor: [],
                borderWidth: 0,
            },
        ],
    };
    tempresult.forEach((item, index) => {
        labels.push(item.category);
        expensesData.push(item.expenses);

        // Calculate color based on index and color count
        const colorIndex = index % colorCount;
        const color = tinycolor(colorPalette[colorIndex]);

        // Adjust color brightness based on index and color count
        const brightness = (index / (result.length - 1)) * (0.4 - 0.1) + 0.1;
        const adjustedColor = color.darken(brightness).toString();

        // Set background color for the dataset
        data.datasets[0].backgroundColor.push(adjustedColor);
    });
    const options = {
        responsive: true,
        aspectRatio: 1,
        plugins: {
            legend: {
                position: 'top',
            },
        }
    };

    return <div>
        {pieChartLoading ?
            <div>
                <Grid mb={5}>
                    <Grid.Col span={4}>
                        <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    </Grid.Col>
                </Grid>
                <Skeleton height={190} circle mb="xl"/>
            </div>
            :
            <div>
                {result.length>1 ?
                    <Pie data={data} options={options} />
                    :
                    <NoDataSVG style={{height:230}}></NoDataSVG>
                }
            </div>
        }
    </div>
};

export default ExpensesPieChart;
