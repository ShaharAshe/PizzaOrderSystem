import {Col, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {FormInputsContext} from "./PizzaOrderRouteTable";
import {Link, useNavigate} from "react-router-dom";

/**
 * Component for displaying the order summary.
 * @param {Object} props - The component props.
 * @param {Object} props.cart - The cart object.
 * @param {Function} props.updateCart - Function to update the cart.
 * @param {Object} props.lastOrder - The last order object.
 * @returns {JSX.Element} - Rendered OrderSummary component.
 */
function OrderSummary({cart, updateCart, lastOrder}){
    const [infoInputs, setInfoInputs, stateIngredientes, dispatchIngredientes, alerts, setAlerts, statePrice, dispatchPrice, countOrders, setCountOrders] = useContext(FormInputsContext);
    const [Labels, setLabels] = useState({});
    const navigate = useNavigate();

    /**
     * Initializes the ingredient and price values.
     */
    const initValuse = ()=> {
        dispatchIngredientes({ type: 'INIT'});
        dispatchPrice({ type: 'INIT'});
    }

    /**
     * Splits a camel case string into words.
     * @param {string} str - The camel case string.
     * @returns {string} - The formatted string.
     */
    const splitCamelCase = (str) => {
        return str.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, function(str){ return str.toUpperCase(); });
    };

    useEffect(() => {
        // Map selected ingredients to list items
        const tempIngredientes = Object.keys(stateIngredientes.names).map(key => {
            if (stateIngredientes.names[key])
                return <li key={key}>{key}</li>
        });

        // Redirect to home page if no ingredients are selected
        if(!Object.keys(tempIngredientes).length)
            navigate('/')

        initValuse();

        // Map order details to UI elements
        const details = Object.keys(lastOrder).map((key,index)=>{
            if(key !== "ingredients")
                return (key === "orderNumber"?
                        (<Col key={key} className="bg-info border border-warning" xs={12}>
                            <div>
                                <p><b>{splitCamelCase(key)}:</b></p>
                            </div>
                            <div>
                                <p>{lastOrder[key]}</p>
                            </div>
                        </Col>)
                        :
                        (<Col key={key} className="border border-black" xs={12}>
                            <div>
                                <p><b>{splitCamelCase(key)}:</b></p>
                            </div>
                            <div>
                                <p>{lastOrder[key]}</p>
                            </div>
                        </Col>)

                    )
        });
        // Update state with order summary details
        setLabels(values => [])
        setLabels(values => ({
            ...values,
            details:details,
            ingredientes:tempIngredientes,
            price:statePrice.price
        }));

        // Update cart with the latest order
        updateCart(values => ({
            ...values,
            [countOrders]:{
                lastOrder
            }
        }));
        console.log("cart",cart)
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