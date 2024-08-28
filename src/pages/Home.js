import {  Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {

    return (
        <>
        <Row>
            <Col className="p-4 text-center">
                <h1>Welcome Strong Mind & body Fitness</h1>
                <p>Track your fitness workouts online!</p>
                <Link className="btn btn-primary" to={'/workouts'}>My Workouts</Link>
            </Col>
        </Row>
        </>
    )
}