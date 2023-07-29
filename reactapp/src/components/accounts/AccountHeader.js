import { Grid, Title, Button } from '@mantine/core';
import { showAccountForm} from "../../features/accountSlice";
import {useDispatch} from "react-redux";

export default function AccountHeader() {
    const dispatch = useDispatch()
    return (
        <div style={{marginBottom:10}}>
            <Grid>
                <Grid.Col span={"content"}>
                    <Title style={{ margin: 5 }} order={2}>Accounts</Title>
                </Grid.Col>
                <Grid.Col span={"content"}>
                    <Button fullWidth radius="md" onClick={()=> dispatch(showAccountForm())} style={{margin:8}}>
                        Add Account
                    </Button>
                </Grid.Col>
            </Grid>
        </div>
    )
}