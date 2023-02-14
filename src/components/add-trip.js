import React, { useState } from 'react';
import TripDataService from '../services/trips';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


const AddTrip = props => {
    let editing = false;
    let initialTripSpouse = "";
    let initialTripFirst_child = "";
    let initialTripSecond_child = "";
    let initialTripThird_child = "";
    let initialTripOthers = "";
    let initialTripTrip_purpose = "";
    let initialTripDeparture_date = "";
    let initialTripReturn_date = "";
    let initialTripDeparture_location = "";
    let initialTripDestination_location = "";
    let initialTripTrip_cost = "";

    if (props.location.state && props.location.state.currentTrip) {
        editing = true;
        initialTripSpouse = props.location.state.currentTrip.spouse;
        initialTripFirst_child = props.location.state.currentTrip.first_child;
        initialTripSecond_child = props.location.state.currentTrip.second_child;
        initialTripThird_child = props.location.state.currentTrip.third_child;
        initialTripOthers = props.location.state.currentTrip.others;
        initialTripTrip_purpose = props.location.state.currentTrip.trip_purpose;
        initialTripDeparture_date = props.location.state.currentTrip.departure_date;
        initialTripReturn_date = props.location.state.currentTrip.return_date;
        initialTripDeparture_location = props.location.state.currentTrip.departure_location;
        initialTripDestination_location = props.location.state.currentTrip.destination_location;
        initialTripTrip_cost = props.location.state.currentTrip.trip_cost;


    }


    const [spouse, setSpouse] = useState(initialTripSpouse);
    const [first_child, setFirst_child] = useState(initialTripFirst_child);
    const [second_child, setSecond_child] = useState(initialTripSecond_child);
    const [third_child, setThird_child] = useState(initialTripThird_child);
    const [others, setOthers] = useState(initialTripOthers);
    const [trip_purpose, setTrip_purpose] = useState(initialTripTrip_purpose);
    const [departure_date, setDeparture_date] = useState(initialTripDeparture_date);
    const [return_date, setReturn_date] = useState(initialTripReturn_date);
    const [departure_location, setDeparture_location] = useState(initialTripDeparture_location);
    const [destination_location, setDestination_location] = useState(initialTripDestination_location);
    const [trip_cost, setTrip_cost] = useState(initialTripTrip_cost);


    // keeps track if trip is submitted
    const [submitted, setSubmitted] = useState(false);


    const onChangeSpouse = e => {
        const spouse = e.target.value;
        setSpouse(spouse);
    }


    const onChangeFirst_child = e => {
        const first_child = e.target.value;
        setFirst_child(first_child);
    }


    const onChangeSecond_child = e => {
        const second_child = e.target.value;
        setSecond_child(second_child);
    }


    const onChangeThird_child = e => {
        const third_child = e.target.value;
        setThird_child(third_child);
    }


    const onChangeOthers = e => {
        const others = e.target.value;
        setOthers(others);
    }


    const onChangeTrip_purpose = e => {
        const trip_purpose = e.target.value;
        setTrip_purpose(trip_purpose);
    }


    const onChangeDeparture_date = e => {
        const departure_date = e.target.value;
        setDeparture_date(departure_date);
    }


    const onChangeReturn_date = e => {
        const return_date = e.target.value;
        setReturn_date(return_date);
    }


    const onChangeDeparture_location = e => {
        const departure_location = e.target.value;
        setDeparture_location(departure_location);
    }


    const onChangeDestination_location = e => {
        const destination_location = e.target.value;
        setDestination_location(destination_location);
    }


    const onChangeTrip_cost = e => {
        const trip_cost = e.target.value;
        setTrip_cost(trip_cost);
    }



    const saveTrip = () => {
        var data = {
            spouse: spouse,
            first_child: first_child,
            second_child: second_child,
            third_child: third_child,
            others: others,
            trip_purpose: trip_purpose,
            departure_date: departure_date,
            return_date: return_date,
            departure_location: departure_location,
            destination_location: destination_location,
            trip_cost: trip_cost,

            completed: false,
        }


        if (editing) {
            TripDataService.updateTrip(
                props.location.state.currentTrip.id,
                data, props.token)
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data)
                })
                .catch(e => {
                    console.log(e);
                })
        }

        else {

            TripDataService.createTrip(data, props.token)
                .then(response => {
                    setSubmitted(true);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }



    return (
        <Container>
            {submitted ? (
                <div>
                    <h4>Trip submitted successfully</h4>
                    <Link to={"/trips/"}>
                        Back to Trips
                    </Link>
                </div>
            ) : (
                <Form>
                    <h2><Form.Label>{editing ? "Edit" : "Create"} Trip</Form.Label></h2>
                    <Form.Group className="mb-3">
                        <Form.Label>Trip Participant 1</Form.Label>
                        <Form.Control type="text" placeholder="Enter your spouse's name" value={spouse} onChange={onChangeSpouse} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Trip Participant 2</Form.Label>
                        <Form.Control type='text' placeholder="Enter name of traveler 1" value={first_child} onChange={onChangeFirst_child} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Trip Participant 3</Form.Label>
                        <Form.Control type='text' placeholder="Enter name of traveler 2" value={second_child} onChange={onChangeSecond_child} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Trip Participant 4</Form.Label>
                        <Form.Control type='text' placeholder="Enter name of traveler 3" value={third_child} onChange={onChangeThird_child} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Other Participants</Form.Label>
                        <Form.Control type='text' placeholder="Enter name of other travelers" value={others} onChange={onChangeOthers} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Trip Purpose</Form.Label>
                        <Form.Control type='text' placeholder="Enter trip purpose" value={trip_purpose} onChange={onChangeTrip_purpose} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Departure Date yyyy-mm-dd</Form.Label>
                        <Form.Control type='text' placeholder="Enter departure date" value={departure_date} onChange={onChangeDeparture_date} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Return Date yyyy-mm-dd</Form.Label>
                        <Form.Control type='text' placeholder="Return Date" value={return_date} onChange={onChangeReturn_date} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Departure Location</Form.Label>
                        <Form.Control type='text' placeholder="Enter departure location" value={departure_location} onChange={onChangeDeparture_location} />
                    </Form.Group>


                    <Form.Group className="mb-3">
                        <Form.Label>Destination Location</Form.Label>
                        <Form.Control type='text' placeholder="Enter destination location" value={destination_location} onChange={onChangeDestination_location} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Trip Cost €</Form.Label>
                        <Form.Control type='text' placeholder="Enter trip cost" value={trip_cost} onChange={onChangeTrip_cost} />
                    </Form.Group>



                    <Button variant="info" onClick={saveTrip}>
                        {editing ? "Edit" : "Add"} Trip
                    </Button>
                </Form>
            )}

        </Container>
    );
}


export default AddTrip;