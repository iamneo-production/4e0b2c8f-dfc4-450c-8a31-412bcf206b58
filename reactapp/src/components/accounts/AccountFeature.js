
import { Grid, Text, Paper } from '@mantine/core';
import {useSelector} from "react-redux";

export default function AccountFeature() {
    const accountList = useSelector(state => state.account.accountList)
    function handleTotalAccount(){
        return accountList.length
    }

    function handleTotalIncome(){
        return accountList.reduce(
            (accumulator, currentValue) => accumulator + currentValue.totalIncome,
            0
        );
    }

    function handleTotalExpense(){
        return accountList.reduce(
            (accumulator, currentValue) => accumulator + currentValue.totalExpenses,
            0
        );
    }

    function handleTotalBalanace(){
        return accountList.reduce(
            (accumulator, currentValue) => accumulator + currentValue.currentBalance,
            0
        );
    }

    return (
        <div style={{marginBottom:10}}>
            <Grid >
                <Grid.Col span={"content"}>
                    <Paper  radius="md" miw={"200px"} p="md" withBorder>
                        <Text size={"lg"} fw={700}>{handleTotalAccount().toLocaleString("en-US")}</Text>
                        <Text size={"sm"} fw={700} c="dimmed">
                            TOTAL ACCOUNTS
                        </Text>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={"content"}>
                    <Paper  radius="md" miw={"200px"} p="md" withBorder>
                        <Text size={"lg"} fw={700}>{`Rs. ${handleTotalIncome().toLocaleString("en-US")}`}</Text>
                        <Text size={"sm"} fw={700} c="dimmed">
                            TOTAL INCOME
                        </Text>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={"content"}>
                    <Paper radius="md" miw={"200px"} p="md" withBorder>
                        <Text size={"lg"} fw={700}>{`Rs. ${handleTotalExpense().toLocaleString("en-US")}`}</Text>
                        <Text size={"sm"} fw={700} c="dimmed">
                            TOTAL EXPENSES
                        </Text>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={"content"}>
                    <Paper  radius="md" miw={"200px"} p="md" withBorder>
                        <Text size={"lg"} fw={700} style={{color: "#26AB35"}}>{`Rs. ${handleTotalBalanace().toLocaleString("en-US")}`}</Text>
                        <Text size={"sm"} fw={700} c="dimmed">
                            TOTAL BALANCE
                        </Text>
                    </Paper>
                </Grid.Col>
            </Grid>

        </div>
    )
}