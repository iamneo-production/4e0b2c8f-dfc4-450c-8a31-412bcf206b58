import {Grid, Paper, Text} from "@mantine/core";
import {useSelector} from "react-redux";
import {useStoreState} from "easy-peasy";

export default function  DashboardFeture(){
    const accountList = useSelector(state => state.account.accountList)
    const budgetList = useSelector(state => state.budget.budgetList)
    const debtPending = useStoreState((state) => state.debtPending);
    function handleTotalBalanace(){
        return accountList.reduce(
            (accumulator, currentValue) => accumulator + currentValue.currentBalance,
            0
        );
    }

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
    return(
        <div>
            <Paper style={{ marginBottom: 16 }} radius="md" p="md" withBorder>
                <Grid>
                    <Grid.Col span={12} sm={6} md={3}>
                        <Text size={"xl"} fw={700}>{`Rs. ${handleTotalBalanace()}`}</Text>
                        <Text size={"sm"} fw={700} c="dimmed">
                            TOTAL BALANCE
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={3}>
                        <Text size={"xl"} fw={700}>{`${Math.floor((100 * handleTotalUsed()) / handleTotalBudget())}%`}</Text>
                        <Text size={"sm"} fw={700} c="dimmed">
                            BUDGET USED
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={3}>
                        <Text size={"xl"} fw={700}>{`${debtPending} `}</Text>
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
        </div>
    )
}