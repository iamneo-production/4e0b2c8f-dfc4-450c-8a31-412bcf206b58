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
import tinycolor from "tinycolor2";
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

const IncomePieChart = (props) => {
    const [result,setResult] = useState([]);
    let tempresult=[];
    const [pieChartLoading,setPieChartLoading] = useState(false)
    const token  = useSelector(state => state.user.token)
    useEffect(() =>{
        setPieChartLoading(true)
        axios.get(`${baseUrl}/dashboard/this-month/income`,{
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
    const labels = [];
    const incomeData = [];
    const colorPalette = ['#C8DEFF', '#6DA8FF', '#247CFF', '#0057DB', '#0042A4'];
    const colorCount = colorPalette.length;
    const MAX_CATEGORIES = 5;

    if (result.length > MAX_CATEGORIES) {
        const topCategories = result.slice(0, MAX_CATEGORIES);
        const otherCategories = result.slice(MAX_CATEGORIES);

        const otherIncomeSum = otherCategories.reduce(
            (sum, item) => sum + item.income,
            0
        );

        topCategories.push({ category: 'Others', income: otherIncomeSum });

        tempresult = topCategories;
    }

    const data = {
        labels,
        datasets: [
            {
                data: incomeData,
                backgroundColor: [],
                borderWidth: 0,
            },
        ],
    };
    result.forEach((item, index) => {
        labels.push(item.category);
        incomeData.push(item.income);

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
                <Skeleton height={190} circle/>
            </div>:
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

export default IncomePieChart;
