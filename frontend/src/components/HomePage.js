import { Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {FormInputsContext} from "./PizzaOrderRouteTable";

/**
 * Component for the home page of the pizza ordering application.
 *
 * @returns {JSX.Element} Home page component.
 */
function HomePage({initCookiesInputs}){
    const [infoInputs, setInfoInputs, stateIngredientes, dispatchIngredientes, alerts, setAlerts, statePrice, dispatchPrice] = useContext(FormInputsContext);

    /**
     * Determines the grid size based on the count of selected ingredients.
     *
     * @returns {number} Grid size.
     */
    const grid = () => {
        if(stateIngredientes.count)
            return 4
        return 6
    }

    /**
     * Initializes all data when starting a new order.
     */
    const initAllData = ()=> {
        dispatchIngredientes({ type: 'INIT'});
        dispatchPrice({ type: 'INIT'});
        setAlerts({
            ingredients:false,
            firstName:false,
            lastName:false,
            street:false,
            house:false,
            number:false,
            city:false,
            phone:false
        });
        initCookiesInputs();
    }

    return(
        <>
            <Row>
                <Col xs={grid()}>
                    <Link className="btn btn-primary" to="/build" onClick={initAllData}>New Order</Link>
                </Col>
                {stateIngredientes.count?
                    <Col xs={grid()}>
                        <Link className="btn btn-primary" to="/build">Resume Order</Link>
                    </Col>
                    :
                    ""
                }
                <Col xs={grid()}>
                    <Link className="btn btn-primary" to="/enter-code">Check order</Link>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col>
                    <img src={'\\images\\pizzaFirst.gif'} className="App-logo" alt="logo"/>
                </Col>
            </Row>
        </>
    );
}

export default HomePage;