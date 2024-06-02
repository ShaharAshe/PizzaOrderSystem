import {Button, Col, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {FormInputsContext} from "./PizzaOrderRouteTable";

function CheckPizzaCode({code, setCode}){
    const [Labels, setLabels] = useState({});
    const [orderNumber, setOrderNumber] = useState(-1);
    const navigate = useNavigate();

    const splitCamelCase = (str) => {
        return str.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, function(str){ return str.toUpperCase(); });
    };
    useEffect(() => {
        if(!code) {
            navigate('/enter-code');
        }
        else {
            fetch("/order/" + code, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(response => {
                    console.log("response", response)
                    let tempIngredientes = []
                    const details = Object.keys(response).map((key, index) => {
                        if (key !== "ingredients") {
                            return (key === "orderNumber" ?
                                    (<Col key={key} className="bg-info border border-warning" xs={12}>
                                        <div key={index++}>
                                            <p><b>{splitCamelCase(key)}:</b></p>
                                        </div>
                                        <div key={index++}>
                                            <p>{response[key]}</p>
                                        </div>
                                    </Col>)
                                    :
                                    (<Col key={key} className="border border-black" xs={12}>
                                        <div key={index++}>
                                            <p><b>{splitCamelCase(key)}:</b></p>
                                        </div>
                                        <div key={index++}>
                                            <p>{response[key]}</p>
                                        </div>
                                    </Col>)

                            )
                        } else {
                            tempIngredientes = response[key].map((ingredient, index) => <li
                                key={index++}>{ingredient}</li>);
                        }
                    });
                    setLabels(values => [])
                    setLabels(values => ({
                        ...values,
                        details: details,
                        ingredientes: tempIngredientes
                    }));
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }}, []);

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <>
            <Row className="text-center">
                <Col className="text-center" xs={12}>
                    <h2>Order Summary</h2>
                </Col>
                <hr/>
                <Col className="text-center" xs={12}>
                    <p><b>Details:</b></p>
                </Col>
                <Col>
                    <Row>
                        {Labels.details}
                    </Row>
                </Col>
                <Col className="border border-black text-center" xs={12}>
                    <p><b>Ingredientes:</b></p>
                    <ol>{Labels.ingredientes}</ol>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col>
                    <Link className="btn btn-primary" to="/">OK</Link>
                </Col>
            </Row>
            <br/>
        </>
    );
}
export default CheckPizzaCode;