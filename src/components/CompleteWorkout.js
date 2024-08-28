import { Button } from "react-bootstrap"
import Swal from "sweetalert2"

export default function CompleteWorkout({workoutId, getWorkouts, status}){
    

    const updateStatus = (e, workoutId) => {
        e.preventDefault();
        fetch(`http://localhost:4000/workouts/completeWorkoutStatus/${workoutId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then( res => res.json())
        .then( data => {
            
            if(data.message === 'Workout status updated successfully'){
                Swal.fire({
                    title: "Success!",
                    icon: "success",
                    text: "Status updated successfully"
                })
                getWorkouts();
            }else {
                Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: "Something went wrong!"
                })
            }
        }).catch(error => {
            console.error('Error clearing cart:', error)     
        });
    }
    return(
        
            (status !== 'completed')
            ? <div className='me-auto '><Button variant="primary" onClick={(e) => updateStatus(e,workoutId)}>Complete</Button></div>
            : <div className='me-auto '><Button variant="success" disabled>Completed</Button></div>
        
        
    )
}