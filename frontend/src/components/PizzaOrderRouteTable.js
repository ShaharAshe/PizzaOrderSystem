import {BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import PizzaBuild from "./PizzaBuild";
import CheckPizzaCode from "./CheckPizzaCode";
import Header from "./Header";
import React, {createContext, useEffect, useState} from "react";
import OrderPizzaForm from "./OrderPizzaForm";

export const FormInputsContext = createContext(null);

function PizzaOrderRouteTable(){
    const [ingredientesInfo, setIngredientesInfo] = useState({})
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
        fetch("/new-pizza", {method:'POST'})
            .then(res=>res.json())
            .then(data=>{
                Object.keys(data).map(d =>{
                    const key = d;
                    let value = (ingredientesInfo?.key) ?? false;

                    setIngredientesInfo(values => ({...values, [key]: value}))
                })
            })
    }, []);

    return (
        <>
            <BrowserRouter>
                <Header/>
                <FormInputsContext.Provider value={[infoInputs, setInfoInputs, ingredientesInfo, setIngredientesInfo, alerts, setAlerts]}>
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