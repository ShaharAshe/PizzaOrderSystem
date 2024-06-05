import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Image} from "react-bootstrap";
import {Link} from "react-router-dom";

/**
 * Component for the header navigation bar.
 *
 * @param {Object} props - Component props.
 * @param {number} props.countOrders - Count of orders in the cart.
 * @param {Function} props.updateCountOrders - Function to update the count of orders.
 * @returns {JSX.Element} Header navigation bar component.
 */
function HeaderNavbar({countOrders, updateCountOrders}){
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand><Link to="/"><Image src={'/pizzaLogo.png'} alt="logo" style={{width:50,height:50}} fluid /></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="btn" to="/">Home</Link>
                        <Link className="btn position-relative" to="/cart">
                            Cart
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {countOrders}
                                <span className="visually-hidden">unread messages</span>
                            </span>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default HeaderNavbar;