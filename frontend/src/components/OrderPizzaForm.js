import {Button, Col, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {FormInputsContext} from "./PizzaOrderRouteTable";
import {Link, useNavigate} from "react-router-dom";
import AlertForm from "./AlertForm";

/**
 * OrderPizzaForm component to collect user's order information.
 *
 * @param {function} updateLastOrder - Function to update the last order.
 * @param {function} resetInfoInputs - Function to reset the form inputs.
 * @returns {JSX.Element} OrderPizzaForm component.
 */
function OrderPizzaForm({updateLastOrder, resetInfoInputs}){
    const Name_pattern = /^[a-zA-Z]+$/;
    const Address_pattern = /^[a-zA-Z0-9]+$/;
    const number_pattern = /^[0-9]+$/;
    const [infoInputs, setInfoInputs, stateIngredientes, dispatchIngredientes, alerts, setAlerts, statePrice, dispatchPrice, countOrders, setCountOrders] = useContext(FormInputsContext);
    const navigate = useNavigate();

    // Redirect to build page if no ingredients selected
    useEffect(() => {
        if (!stateIngredientes.count)
            navigate("/build")
    }, []);

    /**
     * Handles form input change event.
     *
     * @param {Event} event - Input change event.
     */
    const handleChange = (event) => {
        const name = event.target.name.trim();
        let value = event.target.value.trim().toLowerCase();

        setInfoInputs(values => ({...values, [name]: value}))
    }

    /**
     * Handles alerts for input fields.
     *
     * @param {RegExp} pattern - Regular expression pattern to match against the input.
     * @param {string} Inputs - Input value to validate.
     * @param {string} alertName - Name of the alert state to set.
     * @param {Object} alert - Object to store alert status.
     */
    const handleAlert = (pattern, Inputs, alertName, alert) => {
        if (!pattern.test(Inputs.trim())) {
            setAlerts(values => ({...values, [alertName]: true}));
            alert.is_alert = true;
        }
        else
            setAlerts(values => ({...values, [alertName]:false}));
    }

    /**
     * Handles form submission event.
     *
     * @param {Event} event - Form submission event.
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        let alert = {is_alert:false};

        // Handle alert for each input field
        handleAlert(Name_pattern, infoInputs.firstName, "firstName", alert);
        handleAlert(Name_pattern, infoInputs.lastName, "lastName", alert);
        handleAlert(Address_pattern, infoInputs.street, "street", alert);
        handleAlert(Address_pattern, infoInputs.house, "house", alert);
        handleAlert(number_pattern, infoInputs.number, "number", alert);
        handleAlert(Name_pattern, infoInputs.city, "city", alert);
        handleAlert(number_pattern, infoInputs.phone, "phone", alert);

        // If no alerts and ingredients selected, proceed to order placement
        if(!alert.is_alert && stateIngredientes.count){
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

            // Send order data to the server
            fetch("/order", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            })
                .then(res => res.json())
                .then(response => {
                    updateLastOrder(response)
                    setCountOrders(values => values+1);
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
                                <AlertForm isAlert={alerts.firstName}
                                           msg={<>First name must not be empty!<div>It can only contain ONLY letters (A-Z or A-Z).</div></>}
                                />
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
                                <AlertForm isAlert={alerts.lastName}
                                           msg={<>Last name must not be empty!<div>It can only contain ONLY letters (A-Z or A-Z).</div></>}
                                />
                            </Col>
                        </Row>
                        <br/>
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
                                <AlertForm isAlert={alerts.street}
                                           msg={<>Street must not be empty!<div>It can only contain ONLY words (A-Z or A-Z and 0-9).</div></>}
                                />
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
                                <AlertForm isAlert={alerts.house}
                                           msg={<>House must not be empty!<div>It can only contain ONLY words (A-Z or A-Z and 0-9).</div></>}
                                />
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
                                <AlertForm isAlert={alerts.number}
                                           msg={<>Number must not be empty!<div>It can only contain ONLY numbers (0-9).</div></>}
                                />
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
                                <AlertForm isAlert={alerts.city}
                                           msg={<>city must not be empty!<div>It can only contain ONLY letters (A-Z or A-Z).</div></>}
                                />
                            </Col>
                        </Row>
                        <br/>
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
                                <AlertForm isAlert={alerts.phone}
                                           msg={<>Phone must not be empty!<div>It can only contain ONLY numbers (0-9).</div><div>You need to enter 10 numbers for a phone number.</div></>}
                                />
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col xs={6}>
                                <Button variant="success" type="submit">Order</Button>
                            </Col>
                            <Col xs={6}>
                                <Button variant="primary" type="button" onClick={resetInfoInputs}>Reset</Button>
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