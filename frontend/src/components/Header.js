import {Col, Row} from "react-bootstrap";
import HeaderNavbar from "./HeaderNavbar";

/**
 * Component for rendering the header of the application.
 * @returns {JSX.Element} - Rendered Header component.
 */
function Header(){
    return(
        <>
            <Row className="text-center" style={{backgroundColor: 'lightgray'}}>
                <Col className="text-center">
                    <h2>Pizza order site 🍕</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <HeaderNavbar/>
                </Col>
            </Row>
            <br/>
        </>
    );
}

export default Header;