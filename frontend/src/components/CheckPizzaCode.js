import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

function CheckPizzaCode(){
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
        </>
    );
}
export default CheckPizzaCode;