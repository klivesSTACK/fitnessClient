import { useState, useEffect } from "react";
import { Row, Form, Button } from "react-bootstrap";
import PendingWorkouts from "../components/PendingWorkouts";



export default function Workout(){

    const [ workoutName, setWorkoutName] = useState('');
    const [ duration, setDuration] = useState('');

    const [isActive, setIsActive] = useState(true);

    function addWorkout(e) {

        e.preventDefault();
        fetch('https://fitnessapi-briones.onrender.com/workouts/addWorkout',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: workoutName,
                duration: duration
            })
        })
        .then( res => res.json())
        .then( data => {
            console.log(data)
        })

        setWorkoutName('');
        setDuration('')
     }

    useEffect(() => {

        if((workoutName !== "" && duration !== "")){
             setIsActive(true)
        }else {
         setIsActive(false)
        }
 
     }, [workoutName, duration]);

    return (
        
        <>
            <Row className="">
                <div className=" d-flex justify-content-center ">
                    <Form className="col-lg-6 col-sm-12" onSubmit={(e) => addWorkout(e)}>
                    <h3 className="mt-5 text-center">add workout</h3>
                    <Form.Group controlId="workoutName">
                        <Form.Label>Workout name:</Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Workout name"
                            value= {workoutName}
                            onChange={(e) => setWorkoutName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="duration">
                        <Form.Label className='mt-3'>Duration</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Duration"
                            value= {duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                        />
                    </Form.Group>

                        { isActive ? 

                        <Button variant="primary" type="submit" id="submitBtn" className='mt-3'>
                            Submit
                        </Button>
                        : 
                        <Button variant="danger" type="submit" id="submitBtn" disabled className='mt-3'>
                            Submit
                        </Button>
                    }
                    </Form>
                </div>
            </Row>
            <hr></hr>
            <PendingWorkouts workoutName={workoutName}/>
        </>
       
    )
}