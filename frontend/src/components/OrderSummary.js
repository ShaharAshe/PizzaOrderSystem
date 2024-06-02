import {Col, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {FormInputsContext} from "./PizzaOrderRouteTable";
import {Link, useNavigate} from "react-router-dom";

function OrderSummary(){
    const [infoInputs, setInfoInputs, stateIngredientes, dispatchIngredientes, alerts, setAlerts, statePrice, dispatchPrice] = useContext(FormInputsContext);
    const [Labels, setLabels] = useState({});
    const navigate = useNavigate();

    const initValuse = ()=> {
        dispatchIngredientes({ type: 'INIT'});
        dispatchPrice({ type: 'INIT'});
    }
    const splitCamelCase = (str) => {
        return str.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, function(str){ return str.toUpperCase(); });
    };
    useEffect(() => {
        const tempIngredientes = Object.keys(stateIngredientes.names).map(key => {
            if (stateIngredientes.names[key])
                return <li key={key}>{key}</li>
        });
        if(!Object.keys(tempIngredientes).length)
            navigate('/')

        initValuse();


        fetch("/order/last", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(response => {
                console.log("response",response)
                const details = Object.keys(response).map((key,index)=>{
                    if(key !== "ingredients")
                        return (key === "orderNumber"?
                                (<Col key={key} className="bg-info border border-warning" xs={12}>
                                    <div>
                                        <p><b>{splitCamelCase(key)}:</b></p>
                                    </div>
                                    <div>
                                        <p>{response[key]}</p>
                                    </div>
                                </Col>)
                                :
                                (<Col key={key} className="border border-black" xs={12}>
                                    <div>
                                        <p><b>{splitCamelCase(key)}:</b></p>
                                    </div>
                                    <div>
                                        <p>{response[key]}</p>
                                    </div>
                                </Col>)

                            )
                });
                setLabels(values => [])
                setLabels(values => ({
                    ...values,
                    details:details,
                    ingredientes:tempIngredientes,
                    price:statePrice.price
                }));
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);
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
                <hr/>
                <Col className="text-center" xs={12}>
                    <h2>Total Price:</h2>
                </Col>
                <Col className="text-center" xs={12}>
                    <h2>{Labels.price}₪</h2>
                </Col>
                <hr/>
            </Row>
            <Row>
                <Col>
                    <Link className="btn btn-primary" to="/">OK</Link>
                </Col>
            </Row>
            <br/>
        </>
        );
}
export default OrderSummary;