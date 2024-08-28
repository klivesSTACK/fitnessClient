import { useEffect } from "react"
import { Button } from "react-bootstrap"
import Swal from "sweetalert2";

export default function DeleteWorkout({workoutId, getWorkouts}){


    function deleteWorkout(e, workoutId  ){
        e.preventDefault();

        fetch(`http://localhost:4000/workouts/deleteWorkout/${workoutId}`,{
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            
            if(data.message === 'Workout deleted sucessfully'){
                Swal.fire({
                    title: "Deleted",
                    icon: "success",
                    text: "Workout deleted successfully!"
                }); 
            }else {
                Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: "Something went wrong!"
                });
            }
            getWorkouts();
        })
    }

    return(
        <div>
            <Button variant="danger" onClick={(e) => deleteWorkout(e, workoutId)}>Delete</Button>
        </div>
    )
}