import React from "react";
import {Text, Paper, Grid, rem} from "@mantine/core";
export default function BudgetFeature(){
    return(
        <Grid>
            <Grid.Col span={2} style={{ maxWidth: rem(225) }}>
                <Paper shadow="sm" radius="md" p="xs" withBorder>
                <Text fz="xl" fw={800}>10000</Text><br/>
                <Text fz="sm" fw={600} c="dimmed" ta="bottom">
                    TOTAL BUDGET
                </Text>
            </Paper>
            </Grid.Col>
            <Grid.Col span={2} style={{ maxWidth: rem(225) }}>
                <Paper shadow="sm" radius="md" p="xs" withBorder>
                <Text fz="xl" fw={800}>10000</Text><br/>
                <Text fz="sm" fw={600} c="dimmed" ta="bottom">
                    TOTAL USED
                </Text>
            </Paper>
            </Grid.Col>
            <Grid.Col span={2} style={{ maxWidth: rem(225) }}>
                <Paper shadow="sm" radius="md" p="xs" withBorder>
                    <Text fz="xl" fw={800} style={{color: "#26AB35"}}>10000</Text><br/>
                    <Text fz="sm" fw={600} c="dimmed" ta="bottom">
                        TOTAL LEFT
                    </Text>
                </Paper>
            </Grid.Col>
        </Grid>


    );
}