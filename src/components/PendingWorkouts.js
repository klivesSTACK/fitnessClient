import { useEffect, useState } from 'react'
import { Card, Button, Row, Container } from 'react-bootstrap'
import EditWorkout from './EditWorkout'
import DeleteWorkout from './DeleteWorkout'
import CompleteWorkout from './CompleteWorkout'

export default function PendingWorkouts(workoutName){

    
    const [ workout, setWorkout] = useState('')
    const [ status, setStatus] = useState('');
    const [ id, setId ] =useState('');

    function getWorkouts(){
        fetch("https://fitnessapi-briones.onrender.com/workouts/getMyWorkouts",{
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then( res => res.json())
        .then( data => {
            
            if(data){
                const workoutArr = data.workouts.map( workout => {
                    setStatus(workout.status);
                    setId(workout._id);

                    return(
                       <div className='col-lg-3 col-sm-12 mt-3 ' >
                        <Card >
                        <Card.Header as="h6" >{workout.name} </Card.Header>
                        <Card.Body >
                            <Card.Text >
                                <div className='d-flex'>
                                    <div>Duration :  {workout.duration} min </div>
                                    <EditWorkout workoutId={workout._id} getWorkouts={getWorkouts}/>
                                </div>
                            </Card.Text>
                            <Card.Text>Status: {workout.status}</Card.Text>
                            
                            <Card.Text>Added:  { new Date(workout.dateAdded).toLocaleTimeString()}-{ new Date(workout.dateAdded).toLocaleDateString()}</Card.Text>
                                <div className='d-flex'>
                                    <CompleteWorkout workoutId={workout._id} getWorkouts={getWorkouts} status={workout.status}/>
                                    <DeleteWorkout workoutId={workout._id} getWorkouts={getWorkouts}/>
                                </div>
                        </Card.Body>
                        </Card>
                       </div>
                    )
                })

                setWorkout(workoutArr);
            }
        })
    }

    useEffect(()=>{
        getWorkouts()  
    },[workoutName])
    
    return (
        <>
            <h4>Workouts</h4>
            <Container className='row' >
                {workout }
            </Container>
               
            
            
           
        </>   
    )
}