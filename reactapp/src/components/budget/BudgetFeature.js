import React from "react";
import {Text, Paper, Grid} from "@mantine/core";
export default function BudgetFeature(){
    return(
        <div style={{marginBottom:10}}>
            <Grid>
                <Grid.Col span={3} >
                    <Paper shadow="sm" radius="md" p="md" withBorder>
                    <Text size={"lg"} fw={700}>{`Rs. 10000`}</Text>
                    <Text size={"md"} fw={700} c="dimmed" >
                        TOTAL BUDGET
                    </Text>
                </Paper>
                </Grid.Col>
                <Grid.Col span={3} >
                    <Paper shadow="sm" radius="md" p="md" withBorder>
                    <Text size={"lg"} fw={700}>{`Rs. 10000`}</Text>
                    <Text size={"md"} fw={700} c="dimmed" ta="bottom">
                        TOTAL USED
                    </Text>
                </Paper>
                </Grid.Col>
                <Grid.Col span={3} >
                    <Paper shadow="sm" radius="md" p="md" withBorder>
                        <Text size={"lg"} fw={700} style={{color: "#26AB35"}}>{`Rs. 10000`}</Text>
                        <Text size={"md"} fw={700} c="dimmed" ta="bottom">
                            TOTAL LEFT
                        </Text>
                    </Paper>
                </Grid.Col>
            </Grid>
        </div>

    );
}