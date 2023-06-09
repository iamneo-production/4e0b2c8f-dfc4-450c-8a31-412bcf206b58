import {Button, Grid, Title} from '@mantine/core';
import BudgetForm from "./BudgetForm";
import {useDispatch, useSelector} from "react-redux";
import {showBudgetForm,closeBudgetForm,fetchBudget} from "../../features/budgetSlice";
import {fetchTransaction} from "../../features/transactionSlice";
import {fetchCategory} from "../../features/categorySlice";


export default function BudgetHeader() {
    const dispatch = useDispatch()

    const token = useSelector(state => state.user.token)
    dispatch(fetchBudget({token:token}))
    dispatch(fetchTransaction({token:token}))
    dispatch(fetchCategory({token:token}))
    function handleBudgetFormClose() {
        dispatch(closeBudgetForm());
    }
    return (

            <div style={{marginBottom:10}}>
                <Grid>
                    <Grid.Col span={"content"}>
                        <Title style={{ margin: 5 }} order={2}>Budgets</Title>
                    </Grid.Col>
                    <Grid.Col span={"content"}>
                        <Button fullWidth radius="md" onClick={()=> dispatch(showBudgetForm())} style={{margin:8}}>
                            Add Budget
                        </Button>
                    </Grid.Col>
                </Grid>

            </div>
    )
}