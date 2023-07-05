import { Text, Paper, Grid } from '@mantine/core';

export default function GoalFeature() {
    return (
        <div style={{margin:20}}>
            <Grid>
                <Grid.Col span={3}>
                    <Paper radius="md" p="md" withBorder>
                        <Text fw={700}>3</Text>
                        <Text fw={700} c="dimmed">TOTAL GOALS</Text>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Paper radius="md" p="md" withBorder>
                        <Text style={{color:"#F03C2E"}} fw={700}>1</Text>
                        <Text fw={700} c="dimmed">OVERDUE</Text>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Paper radius="md" p="md" withBorder>
                        <Text style={{color:"#34C84A"}} fw={700}>0</Text>
                        <Text fw={700} c="dimmed">TOTAL COMPLETED</Text>
                    </Paper>
                </Grid.Col>
            </Grid>

        </div>
    )
}