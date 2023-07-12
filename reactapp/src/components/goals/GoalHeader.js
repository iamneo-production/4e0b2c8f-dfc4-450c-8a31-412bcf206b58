import { Grid, Title, Button } from '@mantine/core';
import { useState } from 'react';
import GoalForm from './GoalForm';
export default function GoalHeader() {
    const [open,setOpen] = useState(false)
    function handleClose(){
        setOpen(false)
    }

    return (
        <div style={{marginBottom:10}}>
            <Grid>
                <Grid.Col span={"content"}>
                    <Title style={{ margin: 5 }} order={2}>Goals</Title>
                </Grid.Col>
                <Grid.Col style={{margin:8}} span={"content"}>
                    <Button onClick={()=>setOpen(true)} fullWidth>
                        Add Goals
                    </Button>
                </Grid.Col>
            </Grid>
            <GoalForm open={open} close={handleClose}/>
        </div>
    )
}