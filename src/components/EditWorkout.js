import { useState } from "react";
import { Modal, Form, Button } from 'react-bootstrap'
import Swal from "sweetalert2";

export default function EditWorkout({workoutId, getWorkouts}){

    const [ name, setName ] = useState("");
    const [ duration, setDuration] = useState("");

    const [ showEdit, setShowEdit ] = useState(false);

    // function for opening the modal
    const openEdit = (workoutId) => {
        fetch(`https://fitnessapi-briones.onrender.com/workouts/getWorkout/${workoutId}`,{
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
           
            setName(data.workouts.name)
            setDuration(data.workouts.duration)
            
        })
        // open the modal
        setShowEdit(true)
    }

    const closeEdit =() => {

        setShowEdit(false)
        setName("");
        setDuration("");  
    }

    const editWorkout = (e, workoutId) => {
        e.preventDefault();
        fetch(`http://localhost:4000/workouts/updateWorkout/${workoutId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                duration: duration
            })    
        })
        .then( res => res.json())
        .then( data => {
           
            if(data.message === 'Workout updated successfully'){
                Swal.fire({
                    title: "Success!",
                    icon: "success",
                    text: "Workout updated successfully"
                })
                closeEdit();
                getWorkouts();
            }
        })
    }

    return(
        <>
        <div className='ms-auto btn btn-sm bg-primary' onClick={()=> openEdit(workoutId)}>Update</div>

         {/* EDIT MODAL */}
        <Modal show={showEdit} onHide={closeEdit}>
        <Form onSubmit={e=> editWorkout(e, workoutId)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Workout</Modal.Title>
            </Modal.Header>
            <Modal.Body>    
                <Form.Group controlId="workputName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                    type="text" 
                    required 
                    value={name} 
                    onChange={e=> setName(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control 
                    type="text" 
                    required 
                    value={duration} 
                    onChange={e=> setDuration(e.target.value)}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeEdit}>Close</Button>
                <Button variant="success" type="submit">Submit</Button>
            </Modal.Footer>
        </Form>
        </Modal>
        </>
    )
}