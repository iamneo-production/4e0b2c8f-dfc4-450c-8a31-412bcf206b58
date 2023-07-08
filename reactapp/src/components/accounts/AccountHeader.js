import { Grid, Title, Button } from '@mantine/core';
import AccountForm from './AccountForm'
import {useDispatch, useSelector} from "react-redux";
import {closeCategoryForm} from "../../features/categorySlice";
import {closeAccountForm, fetchAccount, showAccountForm} from "../../features/accountSlice";

export default function AccountHeader() {
    const dispatch = useDispatch()
    const displayAccountForm = useSelector(state => state.account.displayAccountForm)
    const token = useSelector(state => state.user.token)
    dispatch(fetchAccount({token:token}))
    function handleAccountFormClose() {
        dispatch(closeAccountForm());
    }

    return (
        <div>
            <Grid>
                <Grid.Col span={2}>
                    <Title order={1}>Accounts</Title>
                </Grid.Col>
                <Grid.Col span={2}>
                    <Button fullWidth onClick={()=> dispatch(showAccountForm())} style={{margin:8}}>
                        Add Account
                    </Button>
                </Grid.Col>
            </Grid>
            <AccountForm open={displayAccountForm} close={handleAccountFormClose}/>
        </div>
    )
}