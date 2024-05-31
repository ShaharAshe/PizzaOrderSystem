import {Button, Col, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {FormInputsContext} from "./PizzaOrderRouteTable";
import {Navigate, useNavigate} from "react-router-dom";

function PizzaBuild(props){
    const [ingredientsNames, setIngredientsNames] = useState([]);
    const [ingredientsLst, setIngredientsLst] = useState([]);
    const [infoInputs, setInfoInputs, ingredientesInfo, setIngredientesInfo, alerts, setAlerts] = useContext(FormInputsContext);
    const [countClicked, setCountClicked] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        setCountClicked(0);
        let tempLst = []

        if(!Object.keys(ingredientesInfo).length)
            navigate("/")

        tempLst.push(
            <Col key={0} className="text-center" xs={12}>
                <p>Choose two ingredients for pizza</p>
            </Col>
        );
        Object.keys(ingredientesInfo).map((d,index) =>{
            setIngredientsNames([...ingredientsNames, d])
            tempLst.push(
                <Col key={index+2} className="text-center" xs={12/Object.keys(ingredientesInfo).length}>
                    <div className="form-check">
                        <label className="form-check-label" htmlFor={(index+2).toString()}>
                            <input
                                name="ingredientes"
                                checked={ingredientesInfo[d]}
                                onChange={()=> handleChange(d)}
                                className="form-check-input"
                                type="checkbox"
                                id={(index+2).toString()}/>{d}
                        </label>
                    </div>
                </Col>
            );
            if(ingredientesInfo[d])
                setCountClicked(countClicked=>countClicked+1);
        });
        tempLst = <Row key={1} className="text-center">{tempLst}</Row>;
        setIngredientsLst((ingredientsLst) => tempLst)
    }, [ingredientesInfo]);

    const handleChange = (name) => {
        setIngredientesInfo(prevState => ({...prevState, [name]: !prevState[name]}));
    }

    const handleSubmit = (event) => {
        event .preventDefault();
        if(countClicked >=2) {
            navigate("/your-info-order");
            setAlerts(values => ({...values, ingredients:false}));
        }
        else
            setAlerts(values => ({...values, ingredients:true}));
    }

    return(
        <>
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