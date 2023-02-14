import React, { useState, useEffect } from 'react';
import TripDataService from '../services/trips';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import moment from 'moment';


const TripsList = props => {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        retrieveTrips();
    }, [props.token]);



    const retrieveTrips = () => {
        TripDataService.getAll(props.token)
            .then(response => {
                setTrips(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }


    const deleteTrip = (tripId) => {
        TripDataService.deleteTrip(tripId, props.token)
            .then(response => {
                retrieveTrips();
            })
            .catch(e => {
                console.log(e);
            });
    }

    const completeTrip = (tripId) => {
        TripDataService.completeTrip(tripId, props.token)
            .then(response => {
                retrieveTrips();
                console.log("completeTrip", tripId);
            })
            .catch(e => {
                console.log(e);
            })
    }


    return (
        <Container>
            {props.token == null || props.token === "" ? (
                <Alert variant='warning'>
                    You are not logged in. Please <Link to={"/login"}>login</Link> to see your trips.
                </Alert>
            ) : (
                <div>
                    <Link to={"/trips/create"}>
                        <Button variant="outline-info" className="mb-3">
                            Add Trip
                        </Button>
                    </Link>
                    {trips.map((trip) => {
                        return (
                            <Card key={trip.id} className="mb-3">
                                <Card.Body>
                                    <div className={`${trip.completed ? "text-decoration-line-through" : ""}`}>
                                        <Card.Title>{trip.trip_purpose}</Card.Title>
                                        <Card.Title><b>Spouse:</b> {trip.spouse}</Card.Title>
                                        <Card.Title><b>First Child:</b> {trip.first_child}</Card.Title>
                                        <Card.Title><b>Second Child:</b> {trip.second_child}</Card.Title>
                                        <Card.Title><b>Third Child:</b> {trip.third_child}</Card.Title>
                                        <Card.Title><b>Others:</b> {trip.others}</Card.Title>
                                        <Card.Title><b>Departure Date:</b> {trip.departure_date}</Card.Title>
                                        <Card.Title><b>Return Date:</b> {trip.return_date}</Card.Title>
                                        <Card.Title><b>Departure Location:</b> {trip.departure_location}</Card.Title>
                                        <Card.Title><b>Destination Location:</b> {trip.destination_location}</Card.Title>
                                        <Card.Title><b>Trip Cost:</b> {trip.trip_cost}</Card.Title>
                                        <Card.Text>
                                            Date created: {moment(trip.created).format("Do MMMM YYYY")}
                                        </Card.Text>
                                    </div>
                                    {!trip.completed &&
                                        <Link to={{
                                            pathname: "/trips/" + trip.id,
                                            state: {
                                                currentTrip: trip
                                            }
                                        }}>
                                            <Button variant="outline-info" className="me-2">
                                                Edit
                                            </Button>
                                        </Link>
                                    }
                                    <Button variant="outline-danger" onClick={() => deleteTrip(trip.id)}>
                                        Delete
                                    </Button>
                                    <Button variant="outline-success" onClick={() => completeTrip(trip.id)}>
                                        Complete
                                    </Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>

            )}
        </Container>
    );
}




export default TripsList;