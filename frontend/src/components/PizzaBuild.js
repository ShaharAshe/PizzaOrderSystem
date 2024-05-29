import {Button, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {forEach} from "react-bootstrap/ElementChildren";

function PizzaBuild(props){
    const [ingredientsNames, setIngredientsNames] = useState([]);
    const [ingredientsPhotos, setIngredientsPhotos] = useState([]);

    useEffect(() => {
        fetch("/new-pizza", {method:'POST'})
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                Object.keys(data).map(d =>{
                    console.log(d)
                    setIngredientsNames([...ingredientsNames, d])
                    setIngredientsPhotos([...ingredientsPhotos, data[d]])
                })
            })
    }, []);

    return(
        <>
            <Row>
                <Col>
                    <form action="#" onSubmit={props.handleSubmit}>
                        <Row className="text-center">
                            <Col>

                            </Col>
                        </Row>
                            <br/>
                        <Row>
                            <Col className="text-center" xs={12}>
                                <Button variant="primary" type="submit">Order</Button>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>
        </>
    );
}

export default PizzaBuild;