import {Button, Col, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {FormInputsContext} from "./PizzaOrderRouteTable";
import {Link, useNavigate} from "react-router-dom";

function OrderPizzaForm(){
    const Name_pattern = /^[a-zA-Z]+$/;
    const Address_pattern = /^[a-zA-Z0-9]+$/;
    const number_pattern = /^[0-9]+$/;
    const [infoInputs, setInfoInputs, stateIngredientes, dispatchIngredientes, alerts, setAlerts, statePrice, dispatchPrice] = useContext(FormInputsContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!stateIngredientes.count)
            navigate("/")
    }, []);

    const handleChange = (event) => {
        const name = event.target.name.trim();
        let value = event.target.value.trim().toLowerCase();

        setInfoInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let alert = false;
        // Check Name
        if (!Name_pattern.test(infoInputs.firstName.trim())) {
            setAlerts(values => ({...values, firstName: true}));
            alert = true;
        }
        else
            setAlerts(values => ({...values, firstName:false}));

        if (!Name_pattern.test(infoInputs.lastName.trim())) {
            setAlerts(values => ({...values, lastName: true}));
            alert = true;
        }
        else
            setAlerts(values => ({...values, lastName:false}));


        // Check Address
        if (!Address_pattern.test(infoInputs.street.trim())) {
            setAlerts(values => ({...values, street: true}));
            alert = true;
        }
        else
            setAlerts(values => ({...values, street: false}));


        if (!Address_pattern.test(infoInputs.house.trim())) {
            setAlerts(values => ({...values, house: true}));
            alert = true;
        }
        else
            setAlerts(values => ({...values, house: false}));


        if (!number_pattern.test(infoInputs.number.trim())) {
            setAlerts(values => ({...values, number: true}));
            alert = true;
        }
        else
            setAlerts(values => ({...values, number: false}));


        if (!Name_pattern.test(infoInputs.city.trim())) {
            setAlerts(values => ({...values, city: true}));
            alert = true;
        }
        else
            setAlerts(values => ({...values, city: false}));


        if (!number_pattern.test(infoInputs.phone.trim()) || infoInputs.phone.trim().length !== 10) {
            setAlerts(values => ({...values, phone: true}));
            alert = true;
        }
        else
            setAlerts(values => ({...values, phone: false}));


        if(!alert){
            let selectedIngredients = {};
            Object.keys(stateIngredientes.names).forEach(key => {
                if (stateIngredientes.names[key]) {
                    selectedIngredients = {...selectedIngredients, [key]: stateIngredientes.names[key]};
                }
            });

            const orderData = {
                ingredients: Object.keys(selectedIngredients),
                ...infoInputs,
                price: statePrice.price
            };

            fetch("/order", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            })
                .then(res => res.json())
                .then(response => {
                    navigate("/order-summary");
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }

    return(
        <>
            <Row>
                <Col>
                    <Link className="btn btn-primary" to="/build">Back</Link>
                </Col>
            </Row>
            <br/>
            <Row>
                <h2>
                    Total price: {statePrice.price}₪
                </h2>
            </Row>
            <Row>
                <Col>
                    <form method="post" action="#" onSubmit={handleSubmit}>
                        {/* Name */}
                        <Row>
                            <Col className="text-center" xs={6}>
                                <div>
                                    <label htmlFor="firstName" className="form-label">Your first name:</label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        name="firstName"
                                        value={infoInputs.firstName}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter Your First name"
                                    />
                                </div>
                                {
                                    alerts.firstName?
                                        (
                                            <div className="bad-val-fu alert alert-danger">First name must not be empty!
                                                <div>It can only contain ONLY letters (A-Z or A-Z).</div>
                                            </div>
                                        )
                                        :
                                        ""
                                }
                            </Col>
                            <Col className="text-center" xs={6}>
                                <div>
                                    <label htmlFor="lastName" className="form-label">Your last name:</label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        name="lastName"
                                        value={infoInputs.lastName || ""}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter Your Lasrt name"
                                    />
                                </div>
                                {
                                    alerts.lastName?
                                        (
                                            <div className="bad-val-fu alert alert-danger">Last name must not be empty!
                                                <div>It can only contain ONLY letters (A-Z or A-Z).</div>
                                            </div>
                                        )
                                        :
                                        ""
                                }
                            </Col>
                        </Row>
                        <br/>

                        {/* Address */}
                        <Row>
                            <Col className="text-center" xs={12}>
                                <p>Address</p>
                            </Col>
                            <Col className="text-center" xs={3}>
                                <div>
                                    <label htmlFor="street" className="form-label">Your street:</label>
                                    <input
                                        id="street"
                                        type="text"
                                        name="street"
                                        value={infoInputs.street || ""}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Your Street"
                                    />
                                </div>
                                {
                                    alerts.street?
                                        (
                                            <div className="bad-val-fu alert alert-danger">Street must not be empty!
                                                <div>It can only contain ONLY words (A-Z or A-Z and 0-9).</div>
                                            </div>
                                        )
                                        :
                                        ""
                                }
                            </Col>
                            <Col className="text-center" xs={3}>
                                <div>
                                    <label htmlFor="house" className="form-label">house:</label>
                                    <input
                                        id="house"
                                        type="text"
                                        name="house"
                                        value={infoInputs.house || ""}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="House"
                                    />
                                </div>
                                {
                                    alerts.house?
                                        (
                                            <div className="bad-val-fu alert alert-danger">House must not be empty!
                                                <div>It can only contain ONLY words (A-Z or A-Z and 0-9).</div>
                                            </div>
                                        )
                                        :
                                        ""
                                }
                            </Col>
                            <Col className="text-center" xs={3}>
                                <div>
                                    <label htmlFor="number" className="form-label">number:</label>
                                    <input
                                        id="number"
                                        type="number"
                                        name="number"
                                        value={infoInputs.number || ""}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="number"
                                        min={1}
                                    />
                                </div>
                                {
                                    alerts.number?
                                        (
                                            <div className="bad-val-fu alert alert-danger">Number must not be empty!
                                                <div>It can only contain ONLY numbers (0-9).</div>
                                            </div>
                                        )
                                        :
                                        ""
                                }
                            </Col>
                            <Col className="text-center" xs={3}>
                                <div>
                                    <label htmlFor="city" className="form-label">Your city:</label>
                                    <input
                                        id="city"
                                        type="text"
                                        name="city"
                                        value={infoInputs.city || ""}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Your City"
                                    />
                                </div>
                                {
                                    alerts.city?
                                        (
                                            <div className="bad-val-fu alert alert-danger">city must not be empty!
                                                <div>It can only contain ONLY letters (A-Z or A-Z).</div>
                                            </div>
                                        )
                                        :
                                        ""
                                }
                            </Col>
                        </Row>
                        <br/>

                        {/* phone number */}
                        <Row>
                            <Col className="text-center" xs={12}>
                                <div>
                                    <label htmlFor="phone" className="form-label">Your phone number:</label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        name="phone"
                                        value={infoInputs.phone || ""}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Your Phone Number"
                                    />
                                </div>
                                {
                                    alerts.phone?
                                        (
                                            <div className="bad-val-fu alert alert-danger">Phone must not be empty!
                                                <div>It can only contain ONLY numbers (0-9).</div>
                                                <div>You need to enter 10 numbers for a phone number.</div>
                                            </div>
                                        )
                                        :
                                        ""
                                }
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col>
                                <Button variant="primary" type="submit">Order</Button>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>
            <br/>
        </>
    );
}

export default OrderPizzaForm;