import React from "react";
import {Text, Paper, Grid} from "@mantine/core";
import {useSelector} from "react-redux";
export default function BudgetFeature(){
    const budgetList = useSelector(state => state.budget.budgetList)
    function handleTotalBudget(){
        return budgetList.reduce(
            (accumulator, currentValue) => accumulator + currentValue.amount,
            0
        );
    }
    function handleTotalUsed(){
        return budgetList.reduce(
            (accumulator, currentValue) => accumulator + currentValue.used,
            0
        );
    }
    function handleTotalLeft(){
        return budgetList.reduce(
            (accumulator, currentValue) => accumulator + currentValue.balance,
            0
        );
    }
    return(
        <div style={{marginBottom:10}}>
            <Grid>
                <Grid.Col span={"content"} >
                    <Paper miw={"200px"}radius="md" p="md" withBorder>
                    <Text size={"lg"} fw={700}>{`Rs. ${handleTotalBudget()}`}</Text>
                    <Text size={"sm"} fw={700} c="dimmed" >
                        TOTAL BUDGET
                    </Text>
                </Paper>
                </Grid.Col>
                <Grid.Col span={"content"} >
                    <Paper miw={"200px"} radius="md" p="md" withBorder>
                    <Text size={"lg"} fw={700}>{`Rs. ${handleTotalUsed()}`}</Text>
                    <Text size={"sm"} fw={700} c="dimmed" ta="bottom">
                        TOTAL USED
                    </Text>
                </Paper>
                </Grid.Col>
                <Grid.Col span={"content"} >
                    <Paper miw={"200px"} radius="md" p="md" withBorder>
                        <Text size={"lg"} fw={700} style={{color: "#26AB35"}}>{`Rs. ${handleTotalLeft()}`}</Text>
                        <Text size={"sm"} fw={700} c="dimmed" ta="bottom">
                            TOTAL LEFT
                        </Text>
                    </Paper>
                </Grid.Col>
            </Grid>
        </div>

    );
}