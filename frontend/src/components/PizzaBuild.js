import {Button, Col, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {FormInputsContext} from "./PizzaOrderRouteTable";

function PizzaBuild(props){
    const [ingredientsNames, setIngredientsNames] = useState([]);
    const [ingredientsLst, setIngredientsLst] = useState([]);
    const [inputs, setInputs] = useContext(FormInputsContext);

    const handleChange = (event) => {
        const name = event.target.name.trim();
        let value = event.target.value.trim().toLowerCase();

        setInputs(values => ({...values, [name]: value}))
        console.log(inputs);
    }

    useEffect(() => {
        console.log("inputs",inputs)
        fetch("/new-pizza", {method:'POST'})
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                let tempLst = []
                let i = 0
                if(Object.keys(data).length)
                {
                    tempLst.push(
                        <Col key={i++} className="text-center" xs={12}>
                            <p>Choose two ingredients for pizza</p>
                        </Col>
                    );
                }
                Object.keys(data).map(d =>{
                    setIngredientsNames([...ingredientsNames, d])
                    console.log(12/Object.keys(data).length)
                    tempLst.push(
                        <Col key={i++} className="text-center" xs={12/Object.keys(data).length}>
                            <div className="form-check">
                                <label className="form-check-label" htmlFor={i.toString()}>
                                    <input
                                        name="ingredientes"
                                        checked={inputs.ingredientes[d]}
                                        onChange={handleChange}
                                        className="form-check-input"
                                        type="checkbox"
                                        id={i.toString()}/>{d}
                                </label>
                            </div>
                        </Col>
                    )
                })
                tempLst = <Row key={i++} className="text-center">{tempLst}</Row>;
                setIngredientsLst((ingredientsLst) => tempLst)
            })
    }, []);

    return(
        <>
            <Row>
                <Col>
                    <form action="#">
                        {/* Ingredients */}
                        {ingredientsLst}
                        <br/>
                        <Row>
                            <Col className="text-center">
                                <Button variant="primary" type="submit">Next</Button>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>
        </>
    );
}

export default PizzaBuild;