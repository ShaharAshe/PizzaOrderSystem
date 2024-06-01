import {Button, Col, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {FormInputsContext} from "./PizzaOrderRouteTable";
import {Navigate, useNavigate} from "react-router-dom";

function PizzaBuild(props){
    const [ingredientsNames, setIngredientsNames] = useState([]);
    const [ingredientsLst, setIngredientsLst] = useState([]);
    const [infoInputs, setInfoInputs, stateIngredientes, dispatchIngredientes, alerts, setAlerts, statePrice, dispatchPrice] = useContext(FormInputsContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!Object.keys(stateIngredientes?.names).length)
            navigate("/")
        let tempLst = []

        tempLst.push(
            <Col key={0} className="text-center" xs={12}>
                <p>Choose at least two pizza ingredients</p>
            </Col>
        );

        Object.keys(stateIngredientes?.names).map((d,index) =>{
            setIngredientsNames([...ingredientsNames, d])
            tempLst.push(
                <Col key={index+3} className="text-center" xs={12/Object.keys(stateIngredientes.names).length}>
                    <div className="form-check">
                        <label className="form-check-label" htmlFor={(index+2).toString()}>
                            <input
                                name="ingredientes"
                                checked={stateIngredientes.names[d]}
                                onChange={()=> handleChange(d)}
                                className="form-check-input"
                                type="checkbox"
                                id={(index+2).toString()}/>{d}
                        </label>
                    </div>
                </Col>
            );
        });

        tempLst.push(
            <Col key={2} className="text-center" xs={12}>
                <br/>
                <p>Each ingredient costs 3₪</p>
            </Col>
        );
        tempLst = <Row key={1} className="text-center">{tempLst}</Row>;
        setIngredientsLst((ingredientsLst) => tempLst)
    }, [stateIngredientes]);

    const handleChange = (name) => {
        if(stateIngredientes.names[name]) {
            dispatchPrice({type: 'DECREMENT'})
        }
        else{
            dispatchPrice({ type: 'INCREMENT' })
        }

        dispatchIngredientes({ type: 'INGREDIENT', payload: name });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("stateIngredientes.count",stateIngredientes.count)
        if(stateIngredientes.count >=2) {
            navigate("/your-info-order");
            setAlerts(values => ({...values, ingredients:false}));
        }
        else
            setAlerts(values => ({...values, ingredients:true}));
    }

    return(
        <>
            <Row>
                <h2>
                    Total price: {statePrice.price}₪
                </h2>
            </Row>
            <Row>
                <Col>
                    <form action="#" onSubmit={handleSubmit}>
                        {/* Ingredients */}
                        {ingredientsLst}
                                {
                                    alerts.ingredients?
                                        (
                                            <Row>
                                                <Col xs={12}>
                                                    <div className="bad-val-fu alert alert-danger">A pizza must include at least 2 ingredients</div>
                                                </Col>
                                            </Row>)
                                        :
                                        ""
                                }
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