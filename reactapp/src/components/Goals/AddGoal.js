import React, { useEffect, useState } from 'react'
import {useNavigate , useParams, Link } from 'react-router-dom'
import GoalsServices from '../services/GoalsServices'

const AddGoal = () => {

    const[description,setDescription]=useState("")
    const[targetAmount,setTargetAmount]=useState("")
    const[currentAmount,setCurrentAmount]=useState("")
    const navigateLog=useNavigate();
    const {id}=useParams();

    const saveOrUpdateGoal=(e)=>{
        e.preventDefault();

        const goal={description,targetAmount,currentAmount}
        
        if(id){
            GoalsServices.updateGoal(id,goal).then((response) =>{
                navigateLog("/api/goals")
            }).catch(error =>{
                console.log(error);
            })
        }
        else{
            GoalsServices.createGoal(goal).then((response) =>{
                console.log(response.data)
    
                navigateLog("/api/goals")
    
            }).catch(error=>{
                console.log(error);
            })
        }
        
    }

    useEffect(() => {
      GoalsServices.getGoalById(id).then((response)=>{
        setDescription(response.data.description)
        setTargetAmount(response.data.targetAmount)
        setCurrentAmount(response.data.currentAmount)

      }).catch(error=>{
        console.log(error);
      })
    }, [])
   
    const title = () =>{
        if(id){
            return <h2 className="text-center">Update Goal</h2>
        }
        else{
            return <h2 className="text-center">Add Goal</h2>
        }
    }

  return (
    <div>
        <br /><br />
        <div className='container'>
            <div className='row'>
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {
                        title()
                    }
                    <form>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Description</label>
                        <input
                            type='text'
                            placeholder='Enter Goal description'
                            name='description'
                            className='form-control'
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                            ></input>
                    </div>

                    <div className='form-group mb-2'>
                        <label className='form-label'>Target Amount</label>
                        <input
                            type='text'
                            placeholder='Enter Target Amount'
                            name='targetAmount'
                            className='form-control'
                            value={targetAmount}
                            onChange={(e)=>setTargetAmount(e.target.value)}
                            ></input>
                    </div>

                    <div className='form-group mb-2'>
                        <label className='form-label'>Current Amount</label>
                        <input
                            type='text'
                            placeholder='Enter Current Amount'
                            name='currentAmount'
                            className='form-control'
                            value={currentAmount}
                            onChange={(e)=>setCurrentAmount(e.target.value)}
                            ></input>
                    </div>
                    
                    <button className='btn btn-success' onClick={(e)=> saveOrUpdateGoal(e)}>Submit</button>
                    <Link to="/api/goals" className='btn btn-danger'>Cancel</Link>
                    </form>

                </div>
            </div>
        </div>
    </div>
  )
}

export default AddGoal;