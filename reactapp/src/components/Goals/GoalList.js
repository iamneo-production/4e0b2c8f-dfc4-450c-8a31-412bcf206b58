import React, { useEffect, useState } from 'react'
import GoalsServices from '../services/GoalsServices';
import { Link } from 'react-router-dom';
const GoalList = () => {

    const [goals, setGoals] = useState([]);

    useEffect(() => {
      getAllGoals();
    }, [])
    
    const getAllGoals =() =>{
        GoalsServices.getAllGoals().then((response) =>{
            setGoals(response.data)
            console.log(response.data);
          }).catch(error =>{
            console.log(error);
          })
    }

    const deleteGoal=(goalId) => {
        GoalsServices.deleteGoal(goalId).then((response) =>{
        getAllGoals();
        }).catch(error =>{
            console.log(error);
        })
    }

  return (
    <div className="container"> 
    <h2 className="text-centre">GOALS</h2>
    <Link to ="/add-goal" className='btn btn-primary mb-2'>Add Goal</Link>
    <table className="table table-bordered table-stripped">
        <thead>
            <th>Goal Id</th>
            <th>Description</th>
            <th>Target Amount</th>
            <th>Current Amount</th>
            <th>Actions</th>
        </thead>
        <tbody>
            {
                goals.map(
                    goal =>
                    <tr key={goal.id}>
                        <td>{goal.id}</td>
                        <td>{goal.description}</td>
                        <td>{goal.targetAmount}</td>
                        <td>{goal.currentAmount}</td>
                        <td>
                            <Link className='btn btn-info' to={`/edit-goal/${goal.id}`}>Update</Link>
                            <Link className='btn btn-danger' onClick={() => deleteGoal(goal.id)} style={{marginLeft:"10px"}}>Delete</Link>
                        </td>
                    </tr>
                )
            }
        </tbody>
    </table>

    </div>
  )
}

export default GoalList;