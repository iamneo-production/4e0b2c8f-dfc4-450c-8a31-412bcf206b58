import Layout from "../components/Layout";

import {BrowserRouter  as Router, Route, Routes} from 'react-router-dom';
import GoalList from './components/goalList';
import AddGoal from './components/AddGoal';
export default function  GoalScreen(){
    return(
        <Layout title={"Goals"} load={false}>
            <div>
                <Router>
                    <div className="container">
                    <Routes>
                    <Route exact path="/" Component={GoalList}></Route>
                    <Route path="/api/goals" Component={GoalList}></Route>
                    <Route path="/add-goal" Component={AddGoal}></Route>
                    <Route path="/edit-goal/:id" Component={AddGoal}></Route>
                    </Routes>
                    </div>
                </Router>
            </div>
        </Layout>
    )
}