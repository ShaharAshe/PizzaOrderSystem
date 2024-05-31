import {Col, Row} from "react-bootstrap";
import {useContext} from "react";
import {FormInputsContext} from "./PizzaOrderRouteTable";

function OrderPizzaForm(){
    const [inputs, setInputs] = useContext(FormInputsContext);
    const handleChange = (event) => {
        const name = event.target.name.trim();
        let value = event.target.value.trim().toLowerCase();

        setInputs(values => ({...values, [name]: value}))
        console.log(inputs);
    }
    return(
        <>
            {/* Name */}
            <Row>
                <Col className="text-center" xs={6}>
                    <div>
                        <label htmlFor="firstName" className="form-label">Your first name:</label>
                        <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={inputs.firstName}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter Your First name"
                        />
                    </div>
                </Col>
                <Col className="text-center" xs={6}>
                    <div>
                        <label htmlFor="lastName" className="form-label">Your last name:</label>
                        <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={inputs.lastName || ""}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter Your Lasrt name"
                        />
                    </div>
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
                            value={inputs.street || ""}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Your Street"
                        />
                    </div>
                </Col>
                <Col className="text-center" xs={3}>
                    <div>
                        <label htmlFor="house" className="form-label">house:</label>
                        <input
                            id="house"
                            type="text"
                            name="house"
                            value={inputs.house || ""}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="House"
                        />
                    </div>
                </Col>
                <Col className="text-center" xs={3}>
                    <div>
                        <label htmlFor="number" className="form-label">number:</label>
                        <input
                            id="number"
                            type="number"
                            name="number"
                            value={inputs.number || ""}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="number"
                        />
                    </div>
                </Col>
                <Col className="text-center" xs={3}>
                    <div>
                        <label htmlFor="city" className="form-label">Your city:</label>
                        <input
                            id="city"
                            type="text"
                            name="city"
                            value={inputs.city || ""}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Your City"
                        />
                    </div>
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
                            value={inputs.phone || ""}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Your Phone Number"
                        />
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default OrderPizzaForm;