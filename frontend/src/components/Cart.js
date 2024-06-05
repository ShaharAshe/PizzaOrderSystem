import {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

/**
 * Component for rendering the cart.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.cart - Cart object containing order details.
 * @param {Function} props.updateCart - Function to update the cart.
 * @returns {JSX.Element} - Rendered Cart component.
 */
function Cart({cart, updateCart}){
    const [inputCards, setInputCards] = useState([]);

    useEffect(() => {
        const tempCard = Object.keys(cart).map((key,index) => {
            const order = cart[key]?.lastOrder;
            const { orderNumber, ingredients, firstName, lastName, street, house, number, city, phone, price } = order;
            return (
                <Col key={index++} xs={12}>
                    <div key={orderNumber} className="bg-info card" style={{ marginBottom: '20px' }}>
                        <div key={index++} className="card-body">
                            <h5 key={index++} className="card-title">Order Number - {orderNumber}</h5>
                            <p key={index++} className="card-text">
                                <strong>Name:</strong> {firstName} {lastName}<br />
                                <strong>Address:</strong> {street} {house}, {number}, {city}<br />
                                <strong>Phone:</strong> {phone}<br />
                                <strong>Price:</strong> {price}₪
                            </p>
                        </div>
                        <div className="bg-info">
                        <ul key={index++} className="list-group list-group-flush">
                            <li key={index++} className="bg-primary-subtle list-group-item"><strong>Ingredients:</strong></li>
                            {ingredients.map((ingredient) => (
                                <li key={index++} className="bg-info-subtle list-group-item">{ingredient}</li>
                            ))}
                        </ul>
                        </div>
                    </div>
                </Col>
            );
        });
        setInputCards(tempCard)
    }, []);

    return (
        <Row>
            {inputCards.length?
                inputCards
                :
                <Col xs={12}>
                    <div>
                    <h2>Cart is empty!🛒</h2>
                    </div>
                    <br/>
                    <div>
                        <Link className="btn btn-primary" to="/">Home</Link>
                    </div>
                </Col>
                }
        </Row>
    );
}

export default Cart;