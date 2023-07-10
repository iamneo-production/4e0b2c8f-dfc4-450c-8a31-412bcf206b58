import Layout from "../components/Layout";
import BudgetHeader from "../components/budget/BudgetHeader";
import BudgetFeature from "../components/budget/BudgetFeature";
import BudgetList from "../components/budget/BudgetList";
import {useDispatch,useSelector} from "react-redux";
import {fetchBudget} from "../features/budgetSlice";


export default function BudgetScreen(){
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    dispatch(fetchBudget({token:token}))
    return(
        <Layout title={"Budgets"} load={true}>

                <BudgetHeader/>
                <BudgetFeature/>
                <BudgetList/>

        </Layout>
    )
}