import { Text, Paper, Grid } from '@mantine/core';
import {useSelector} from "react-redux";

export default function GoalFeature() {
    const goalList = useSelector(state => state.goal.goalList)
    function pendingGoals(){
        let pendings=0
        for (let i=0;i<goalList.length;i++){
            if(goalList[i].status === 'Pending'){
                pendings = pendings +1
            }
        }
        return pendings
    }
    return (
        <div style={{marginBottom:10}}>
            <Grid>
                <Grid.Col span={"content"}>
                    <Paper miw={"200px"}radius="md" p="md" withBorder>
                        <Text size={"lg"} fw={700}>{goalList.length}</Text>
                        <Text size={"sm"} fw={700} c="dimmed">TOTAL GOALS</Text>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={"content"}>
                    <Paper miw={"200px"} radius="md" p="md" withBorder>
                        <Text size={"lg"} style={{color:"#F03C2E"}} fw={700}>{pendingGoals()}</Text>
                        <Text size={"sm"} fw={700} c="dimmed">PENDING GOALS</Text>
                    </Paper>
                </Grid.Col>
            </Grid>

        </div>
    )
}