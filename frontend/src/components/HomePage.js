import { Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

function HomePage(){
    return(
        <>
            <Row>
                <Col xs={6}>
                    <Link className="btn btn-primary" to="/build">New Order</Link>
                </Col>
                <Col xs={6}>
                    <Link className="btn btn-primary" to="/prevOrder">order by<br/> prev order code</Link>
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