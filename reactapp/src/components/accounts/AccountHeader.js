import { Grid, Title, Button } from '@mantine/core';
import { showAccountForm} from "../../features/accountSlice";
import {useDispatch} from "react-redux";

export default function AccountHeader() {
    return (
        <div>
            <Grid>
                <Grid.Col span={2}>
                    <Title order={1}>Accounts</Title>
                </Grid.Col>
                <Grid.Col span={2}>
                    <Button fullWidth radius="md" onClick={()=> dispatch(showAccountForm())} style={{margin:8}}>
                        Add Account
                    </Button>
                </Grid.Col>
            </Grid>
        </div>
    )
}