import { Text, Paper, Grid } from '@mantine/core';

export default function GoalFeature() {
    return (
        <div style={{marginBottom:10}}>
            <Grid>
                <Grid.Col span={"content"}>
                    <Paper miw={"200px"}radius="md" p="md" withBorder>
                        <Text size={"lg"} fw={700}>3</Text>
                        <Text size={"sm"} fw={700} c="dimmed">TOTAL GOALS</Text>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={"content"}>
                    <Paper miw={"200px"} radius="md" p="md" withBorder>
                        <Text size={"lg"} style={{color:"#F03C2E"}} fw={700}>1</Text>
                        <Text size={"sm"} fw={700} c="dimmed">OVERDUE GOALS</Text>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={"content"}>
                    <Paper miw={"200px"} radius="md" p="md" withBorder>
                        <Text size={"lg"} style={{color:"#34C84A"}} fw={700}>0</Text>
                        <Text size={"sm"} fw={700} c="dimmed">TOTAL COMPLETED</Text>
                    </Paper>
                </Grid.Col>
            </Grid>

        </div>
    )
}