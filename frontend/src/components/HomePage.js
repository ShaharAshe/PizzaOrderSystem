import { Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {FormInputsContext} from "./PizzaOrderRouteTable";

function HomePage(){
    const [infoInputs, setInfoInputs, stateIngredientes, dispatchIngredientes, alerts, setAlerts, statePrice, dispatchPrice] = useContext(FormInputsContext);
    const grid = () => {
        if(stateIngredientes.count)
            return 4
        return 6
    }

    const initAllData = ()=> {
        dispatchIngredientes({ type: 'INIT'});
        dispatchPrice({ type: 'INIT'});
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