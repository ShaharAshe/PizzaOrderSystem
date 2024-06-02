import {Button, Col, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

function EnterPizzaCode({code, updateCode}){
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/prevOrder');
    }
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