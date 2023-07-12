import React from "react";
import {Text, Paper, Grid} from "@mantine/core";
export default function BudgetFeature(){
    return(
        <div style={{margin:20}}>
            <Grid>
                <Grid.Col span={3} >
                    <Paper shadow="sm" radius="md" p="md" withBorder>
                    <Text size={"lg"} fw={700}>10000</Text><br/>
                    <Text size={"md"} fw={700} c="dimmed" ta="bottom">
                        TOTAL BUDGET
                    </Text>
                </Paper>
                </Grid.Col>
                <Grid.Col span={3} >
                    <Paper shadow="sm" radius="md" p="md" withBorder>
                    <Text size={"lg"} fw={700}>10000</Text><br/>
                    <Text size={"md"} fw={700} c="dimmed" ta="bottom">
                        TOTAL USED
                    </Text>
                </Paper>
                </Grid.Col>
                <Grid.Col span={3} >
                    <Paper shadow="sm" radius="md" p="md" withBorder>
                        <Text size={"lg"} fw={700} style={{color: "#26AB35"}}>10000</Text><br/>
                        <Text size={"md"} fw={700} c="dimmed" ta="bottom">
                            TOTAL LEFT
                        </Text>
                    </Paper>
                </Grid.Col>
            </Grid>
        </div>

    );
}