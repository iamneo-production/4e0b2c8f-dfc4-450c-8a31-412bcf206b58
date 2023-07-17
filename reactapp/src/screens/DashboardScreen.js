import Layout from "../components/Layout";
import {validateToken} from "../features/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import BarChart from "../components/dashboard/BarChart";
import {Divider, Grid, Paper, Text, Title} from "@mantine/core";
import PieChart from "../components/dashboard/PieChart";

export default function  DashboardScreen(){
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    useEffect(()=>{
        dispatch(validateToken(token))
    },)

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
                                    <Title order={4}>- Rs. 10,000</Title>
                                    <Text c={"dimmed"}>This Month Expenses</Text>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <Title style={{color: "#26AB35"}} order={4}>+ Rs. 18,000</Title>
                                    <Text c={"dimmed"}>This Month Income</Text>
                                </Grid.Col>
                            </Grid>
                            <Divider my="sm" />
                           <PieChart></PieChart>
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