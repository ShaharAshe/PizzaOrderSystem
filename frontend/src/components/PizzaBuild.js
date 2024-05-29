import {Button, Col, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {forEach} from "react-bootstrap/ElementChildren";

function PizzaBuild(props){
    const [ingredientsNames, setIngredientsNames] = useState([]);
    const [ingredientsPhotos, setIngredientsPhotos] = useState([]);
    const [ingredientsLst, setIngredientsLst] = useState([]);
    useEffect(() => {
        fetch("/new-pizza", {method:'POST'})
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                let tempLst = []
                let i = 0
                Object.keys(data).map(d =>{
                    console.log(d)
                    setIngredientsNames([...ingredientsNames, d])
                    setIngredientsPhotos([...ingredientsPhotos, data[d]])
                    tempLst.push(
                        <Col key={i++} className="text-center" xs={12}>
                            <div className="form-check" style={{ display: 'table'}}>
                                <label className="form-check-label" htmlFor={i.toString()}>{d}</label>
                                <input className="form-check-input" type="checkbox" id={i.toString()}/>
                            </div>
                        </Col>
                    )
                })
                setIngredientsLst(tempLst)
            })
    }, []);

    return(
        <>
            <Row>
                <Col>
                    <form action="#" onSubmit={props.handleSubmit}>
                        <Row className="text-center">
                            {ingredientsLst}
                        </Row>
                        <br/>
                        <Row>
                            <Col className="text-center" xs={12}>
                                <Button variant="primary" type="submit">Next</Button>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>
            <Row>
                <Col>
                    {/*<div style={{display:"flex"}}>*/}
                    {/*    <Image src={'/PizzaBase.png'} alt="PizzaBase" style={{zIndex:2,position:"absolute"}} fluid />*/}
                    {/*    <Image src={'/Basil.png'} alt="PizzaBase" style={{zIndex:3,position:"absolute"}} fluid />*/}
                    {/*</div>*/}
                </Col>
            </Row>
        </>
    );
}

export default PizzaBuild;