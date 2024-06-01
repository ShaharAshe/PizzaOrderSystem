import {BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import PizzaBuild from "./PizzaBuild";
import CheckPizzaCode from "./CheckPizzaCode";
import Header from "./Header";
import React, {createContext, useEffect, useReducer, useState} from "react";
import OrderPizzaForm from "./OrderPizzaForm";
import {PriceReducer} from "./PriceReducer";
import {IngredientsReducer} from "./IngredientsReducer";

export const FormInputsContext = createContext(null);

function PizzaOrderRouteTable(){
    const [statePrice, dispatchPrice] = useReducer(PriceReducer, { price:55 });
    const [stateIngredientes, dispatchIngredientes] = useReducer(IngredientsReducer,{names:{}, count:0})
    const [infoInputs, setInfoInputs] = useState({
        firstName:"",
        lastName:"",
        street:"",
        house:"",
        number:"",
        city:"",
        phone:""
    });
    const [alerts, setAlerts] = useState({
        ingredients:false,
        firstName:false,
        lastName:false,
        street:false,
        house:false,
        number:false,
        city:false,
        phone:false
    })
    useEffect(() => {
        let tempIngredientes = {}
        fetch("/new-pizza", {method:'POST'})
            .then(res=>res.json())
            .then(data=>{
                Object.keys(data).map(d =>{
                    const key = d;
                    let value = (stateIngredientes?.names?.key) ?? false;
                    tempIngredientes={...tempIngredientes, [key]: value};
                })
                dispatchIngredientes({ type: 'INIT', payload: tempIngredientes });
            })
    }, []);

    return (
        <>
            <BrowserRouter>
                <Header/>
                <FormInputsContext.Provider value={[infoInputs, setInfoInputs, stateIngredientes, dispatchIngredientes, alerts, setAlerts, statePrice, dispatchPrice]}>
                <Routes>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/build" element={<PizzaBuild/>}/>
                    <Route path="/your-info-order" element={<OrderPizzaForm/>} />
                    <Route path="/prevOrder" element={<CheckPizzaCode/>}/>
                </Routes>
                </FormInputsContext.Provider>
            </BrowserRouter>
        </>
    );
}

export default PizzaOrderRouteTable;