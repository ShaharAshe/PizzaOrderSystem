import {Button, Col, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {FormInputsContext} from "./PizzaOrderRouteTable";

/**
 * Component for checking a pizza order code.
 *
 * @param {Object} props - Component props.
 * @param {string} props.code - Current pizza order code.
 * @param {Function} props.setCode - Function to set the pizza order code.
 * @returns {JSX.Element} - Rendered CheckPizzaCode component.
 */
function CheckPizzaCode({code, setCode}){
    const [Labels, setLabels] = useState({});
    const [orderNumber, setOrderNumber] = useState(-1);
    const navigate = useNavigate();

    /**
     * Splits a camel case string and returns it with spaces.
     *
     * @param {string} str - Camel case string.
     * @returns {string} - String with spaces between words.
     */
    const splitCamelCase = (str) => {
        return str.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, function(str){ return str.toUpperCase(); });
    };

    useEffect(() => {
        if(!code) {
            navigate('/enter-code');
        }
        else {
            fetch("/order/id/" + code, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if (res.ok)
                        return res.json()
                    else
                        return Promise.reject(res.status);
                })
                .then(response => {
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
                        ingredientes: <><Col className="border border-black text-center" xs={12}><p><b>Ingredientes:</b></p><ol>{tempIngredientes}</ol></Col></>
                    }));
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }}, []);

    return (
        <>
            <Row className="text-center">
                {Object.keys(Labels).length?
                (
                    <Col className="text-center" xs={12}>
                        <h2>Order Summary</h2>
                    </Col>
                )
                :
                ''}
                <hr/>
                {Object.keys(Labels).length?
                    (
                        <Col className="text-center" xs={12}>
                            <p><b>Details:</b></p>
                        </Col>
                    )
                    :
                    (<h2>Order Code not found!🙃</h2>)}
                <Col>
                    <Row>
                        {Labels.details}
                    </Row>
                </Col>
                {Labels.ingredientes}
            </Row>
            <br/>
            <Row>
                {Object.keys(Labels).length?
                    (
                        <>
                            <Col xs={12} md={6}>
                                <Link className="btn btn-primary" to="/">OK</Link>
                            </Col>
                            <Col xs={12} md={6}>
                                <Link className="btn btn-success" to="/enter-code">Search more</Link>
                            </Col>
                        </>
                    )
                    :
                    (
                        <Col>
                            <Link className="btn btn-primary" to="/enter-code">Try again</Link>
                        </Col>
                    )}
            </Row>
            <br/>
        </>
    );
}
export default CheckPizzaCode;