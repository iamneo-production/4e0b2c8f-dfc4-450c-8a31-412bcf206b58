import Layout from "../components/Layout";
import GoalHeader from '../components/goals/GoalHeader';
import GoalFeature from "../components/goals/GoalFeature";
import GoalList from "../components/goals/GoalList";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {validateToken} from "../features/userSlice";
import {fetchGoal} from "../features/goalSlice";
export default function  GoalScreen(){
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    useEffect(()=>{
        async function fetchData() {
            await dispatch(validateToken(token))
            dispatch(fetchGoal({token:token}))
        }
        fetchData()
    },[])
    return(
        <Layout title={"Goals"} load={true}>
            <GoalHeader/>
            <GoalFeature/>
            <GoalList/>
        </Layout>
    )
}