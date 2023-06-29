import { Grid, Title, Button } from '@mantine/core';
import AccountForm from './AccountForm'
import { useState } from 'react';

export default function AccountHeader() {
    const[open,setOpen] = useState(false)
    function handleClose(){
        setOpen(false)
    }
    return (
        <div>
            <Grid>
                <Grid.Col span={2}>
                    <Title order={1}>Accounts</Title>
                </Grid.Col>
                <Grid.Col span={2}>
                    <Button fullWidth onClick={()=> setOpen(true)} style={{margin:8}}>
                        Add Account
                    </Button>
                </Grid.Col>
            </Grid>
            <AccountForm open={open} close={handleClose}/>
        </div>
    )
}