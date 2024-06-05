import {Button, Col, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

/**
 * Component for entering a pizza order code.
 *
 * @param {Object} props - Component props.
 * @param {string} props.code - Current pizza order code.
 * @param {Function} props.updateCode - Function to update the pizza order code.
 * @returns {JSX.Element} - Rendered EnterPizzaCode component.
 */
function EnterPizzaCode({code, updateCode}){
    const navigate = useNavigate();

    /**
     * Handles form submission.
     *
     * @param {Object} event - Form submission event.
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/prevOrder');
    }

    /**
     * Handles change in input field.
     *
     * @param {Object} event - Change event.
     */
    const handleChange = (event) => {
        const value = event.target.value.trim();

        updateCode(values => value);
    }

    return(
        <>
            <Row>
                <h2>
                    Enter Order Code
                </h2>
            </Row>
            <Row>
                <Col>
                    <form method="get" action="#" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="orderCode" className="form-label">Order Code:</label>
                            <input
                                id="orderCode"
                                type="number"
                                name="orderCode"
                                value={code || ""}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter An Order Code"
                                min={0}
                            />
                        </div>
                        <br/>
                        <div>
                            <Button variant="primary" type="submit">Check</Button>
                        </div>
                    </form>
                </Col>
            </Row>
        </>
    );
}
export default EnterPizzaCode;