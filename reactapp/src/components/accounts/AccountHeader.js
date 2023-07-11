import { Grid, Title, Button } from '@mantine/core';
import AccountForm from './AccountForm'
import {useDispatch, useSelector} from "react-redux";
import {closeCategoryForm} from "../../features/categorySlice";
import { showAccountForm} from "../../features/accountSlice";

export default function AccountHeader() {
    const dispatch = useDispatch()

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