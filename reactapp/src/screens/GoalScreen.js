import Layout from "../components/Layout";
import GoalHeader from '../components/goals/GoalHeader';
import GoalFeature from "../components/goals/GoalFeature";
import GoalList from "../components/goals/GoalList";
export default function  GoalScreen(){
    return(
        <Layout title={"Goals"} load={true}>
            <GoalHeader/>
            <GoalFeature/>
            <GoalList/>
        </Layout>
    )
}