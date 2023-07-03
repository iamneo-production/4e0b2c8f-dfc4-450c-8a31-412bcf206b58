
import { Grid, Text, Paper } from '@mantine/core';

export default function AccountFeature() {
    return (
        <div style={{margin:20}}>
            <Grid >
                <Grid.Col span={3}>
                    <Paper radius="md" p="md" withBorder>
                        <Text size={"lg"} fw={700}>3</Text>
                        <Text size={"md"} fw={700} c="dimmed">
                            TOTAL ACCOUNTS
                        </Text>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Paper radius="md" p="md" withBorder>
                        <Text size={"lg"} fw={700}>Rs. 95,000</Text>
                        <Text size={"md"} fw={700} c="dimmed">
                            TOTAL DEPOSIT
                        </Text>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Paper radius="md" p="md" withBorder>
                        <Text size={"lg"} fw={700}>Rs. 60,900</Text>
                        <Text size={"md"} fw={700} c="dimmed">
                            TOTAL WITHDRAWAL
                        </Text>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Paper radius="md" p="md" withBorder>
                        <Text size={"lg"} fw={700} style={{color: "#26AB35"}}>Rs. 35,000</Text>
                        <Text size={"md"} fw={700} c="dimmed">
                            TOTAL BALANCE
                        </Text>
                    </Paper>
                </Grid.Col>
            </Grid>

        </div>
    )
}