import { Grid, Title, Button } from '@mantine/core';
import { useState } from 'react';
import GoalForm from './GoalForm';
export default function GoalHeader() {
    const [open,setOpen] = useState(false)
    function handleClose(){
        setOpen(false)
    }

    return (
        <div>
            <Grid>
                <Grid.Col span={2}>
                    <Title order={1}>Goals</Title>
                </Grid.Col>
                <Grid.Col style={{margin:8}} span={2}>
                    <Button onClick={()=>setOpen(true)} fullWidth>
                        Add Goals
                    </Button>
                </Grid.Col>
            </Grid>
            <GoalForm open={open} close={handleClose}/>
        </div>
    )
}