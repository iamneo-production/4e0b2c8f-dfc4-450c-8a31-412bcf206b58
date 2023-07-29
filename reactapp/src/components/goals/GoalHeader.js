import { Grid, Title, Button } from '@mantine/core';
import {showGoalForm} from "../../features/goalSlice";
import {useDispatch} from "react-redux";
export default function GoalHeader() {
    const dispatch = useDispatch()
    return (
        <div style={{marginBottom:10}}>
            <Grid>
                <Grid.Col span={"content"}>
                    <Title style={{ margin: 5 }} order={2}>Goals</Title>
                </Grid.Col>
                <Grid.Col style={{margin:8}} span={"content"}>
                    <Button radius="md" miw={"120px"} onClick={() => dispatch(showGoalForm())} fullWidth>
                        Add Goals
                    </Button>
                </Grid.Col>
            </Grid>
        </div>
    )
}