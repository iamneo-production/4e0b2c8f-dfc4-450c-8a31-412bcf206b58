import Layout from "../components/Layout";
import BudgetFeature from "../components/budget/BudgetFeature";
import BudgetHeader from "../components/budget/BudgetHeader";
import BudgetList from "../components/budget/BudgetList";

export default function BudgetScreen(){
    return(
        <Layout title={"Budget"} load={true}>
            <BudgetHeader/>
            <BudgetFeature/>
            <br/>
            <BudgetList/>

        </Layout>
    )
}