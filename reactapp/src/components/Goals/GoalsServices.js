import axios from 'axios'

const GOAL_BASE_REST_API_URL="http://localhost:8080/api/goals"

class GoalsService{
    getAllGoals(){
        return axios.get(GOAL_BASE_REST_API_URL)
    }

    createGoal(goal){
        return axios.post(GOAL_BASE_REST_API_URL,goal);
    }

    getGoalById(goalId){
        return axios.get(GOAL_BASE_REST_API_URL+'/'+goalId);
    }

    updateGoal(goalId,goal){
        return axios.put(GOAL_BASE_REST_API_URL+'/'+goalId,goal);
    }

    deleteGoal(goalId) {
        const params = { id: goalId };
        const config = { params };
      
        return axios.delete(GOAL_BASE_REST_API_URL, config)
      }

}


export default new GoalsService();