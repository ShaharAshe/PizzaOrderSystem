import {Button, Col, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {FormInputsContext} from "./PizzaOrderRouteTable";
import {Navigate, useNavigate} from "react-router-dom";

/**
 * Component for building a pizza, allowing users to select ingredients.
 * @param {object} props - Component props.
 * @returns {JSX.Element} - Rendered PizzaBuild component.
 */
function PizzaBuild(props){
    const [ingredientsNames, setIngredientsNames] = useState([]);
    const [ingredientsLst, setIngredientsLst] = useState([]);
    const [infoInputs, setInfoInputs, stateIngredientes, dispatchIngredientes, alerts, setAlerts, statePrice, dispatchPrice] = useContext(FormInputsContext);
    const navigate = useNavigate();

    // Effect to update ingredient list
    useEffect(() => {
        let tempLst = []

        tempLst.push(
            <Col key={0} className="text-center" xs={12}>
                <p>Choose at least two pizza ingredients</p>
            </Col>
        );

        // Dynamically create checkboxes for each ingredient
        Object.keys(stateIngredientes?.names).map((d,index) =>{
            setIngredientsNames([...ingredientsNames, d])
            tempLst.push(
                <Col key={index+3} className="text-center" xs={12}>
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

    /**
     * Handler for changing the state of ingredient checkboxes.
     * @param {string} name - Name of the ingredient being selected/deselected.
     */
    const handleChange = (name) => {
        if(stateIngredientes.names[name]) // If the ingredient is already selected, decrement the price
            dispatchPrice({type: 'DECREMENT'})
        else // If the ingredient is not selected, increment the price
            dispatchPrice({ type: 'INCREMENT' })

        // Update the state to reflect the selected/deselected ingredient
        dispatchIngredientes({ type: 'INGREDIENT', payload: name });
    }

    /**
     * Handler for submitting the pizza build form.
     * @param {Event} event - The form submission event.
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        if(stateIngredientes.count >=2) {
            // If at least 2 ingredients are selected, navigate to the next step
            navigate("/your-info-order");
            // Clear any previous alert about insufficient ingredients
            setAlerts(values => ({...values, ingredients:false}));
        }
        else // If less than 2 ingredients are selected, show an alert
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
            <br/>
        </>
    );
}

export default PizzaBuild;