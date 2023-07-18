import Layout from "../components/Layout";
import {validateToken} from "../features/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import BarChart from "../components/dashboard/BarChart";
import {Divider, Grid, Paper, Text, Title} from "@mantine/core";
import IncomePieChart from "../components/dashboard/IncomePieChart";
import ExpensesPieChart from "../components/dashboard/ExpensesPieChart";
import axios from "axios";
import {baseUrl} from "../api/config";

export default function  DashboardScreen(){
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const [result,setResult] = useState({});

    useEffect(()=>{
        dispatch(validateToken(token))
        axios.get(`${baseUrl}/dashboard/this-month/total/income-and-expenses`,{
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) =>{
            setResult(res.data.data)
            console.log("res",res.data.data)
        }).catch((err) =>{
            console.log(err)
        })
    },[])

    return(
        <Layout title={"Dashboard"} load={true}>
            <div >
                <Title style={{ margin: 5,marginBottom:10 }} order={2}>Dashboard</Title>
                <Paper style={{ marginBottom: 16 }} radius="md" p="md" withBorder>
                    <Grid>
                        <Grid.Col span={12} sm={6} md={3}>
                            <Text size={"xl"} fw={700}>{`Rs. 10000`}</Text>
                            <Text size={"sm"} fw={700} c="dimmed">
                                TOTAL BALANCE
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={12} sm={6} md={3}>
                            <Text size={"xl"} fw={700}>{`40%`}</Text>
                            <Text size={"sm"} fw={700} c="dimmed">
                                BUDGET USED
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={12} sm={6} md={3}>
                            <Text size={"xl"} fw={700}>{`1 / 2`}</Text>
                            <Text size={"sm"} fw={700} c="dimmed">
                                DEBTS PENDING
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={12} sm={6} md={3}>
                            <Text size={"xl"} fw={700}>{`3 / 5`}</Text>
                            <Text size={"sm"} fw={700} c="dimmed">
                                GOALS COMPLETED
                            </Text>
                        </Grid.Col>
                    </Grid>
                </Paper>
                <Grid style={{height:300}}>
                    <Grid.Col span={12} md={6}>
                        <Paper  radius="md" p="md" withBorder>
                            <Grid >
                                <Grid.Col span={12} md={6}>
                                    <Title order={4}>{`- Rs. ${result?.total_expenses}`}</Title>
                                    <Text c={"dimmed"}>This Month Expenses</Text>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <Title style={{color: "#26AB35"}} order={4}>{`+ Rs. ${result?.total_income}`}</Title>
                                    <Text c={"dimmed"}>This Month Income</Text>
                                </Grid.Col>
                            </Grid>
                            <Divider my="sm" style={{marginBottom:20}} />
                            <Grid>
                                <Grid.Col span={6}>
                                    <ExpensesPieChart/>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <IncomePieChart/>
                                </Grid.Col>
                            </Grid>

                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={12} md={6}>
                        <Paper radius="md" p="md" withBorder>
                            <Title order={4}>Last 6 month</Title>
                            <Text c={"dimmed"}>Income and expenses</Text>
                            <Divider my="sm" />
                            <BarChart />
                        </Paper>
                        </Grid.Col>
                </Grid>

            </div>
        </Layout>
    )
}