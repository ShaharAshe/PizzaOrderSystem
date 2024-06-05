import {BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import PizzaBuild from "./PizzaBuild";
import CheckPizzaCode from "./CheckPizzaCode";
import Header from "./Header";
import React, {createContext, useEffect, useReducer, useState} from "react";
import OrderPizzaForm from "./OrderPizzaForm";
import {PriceReducer} from "./PriceReducer";
import {IngredientsReducer} from "./IngredientsReducer";
import OrderSummary from "./OrderSummary";
import EnterPizzaCode from "./EnterPizzaCode";
import useInputs from "./useInputs";
import Cart from "./Cart";

// Create a context for form inputs
export const FormInputsContext = createContext(null);

/**
 * Component defining the routes and main logic for the pizza order application.
 * @returns {JSX.Element} - Rendered PizzaOrderRouteTable component.
 */
function PizzaOrderRouteTable(){
    const [lastOrder, setLastOrder] = useState({});
    const [countOrders, setCountOrders] = useState(0);
    const [cart, setCart] = useState({});
    const [code, setCode] = useState();
    const [statePrice, dispatchPrice] = useReducer(PriceReducer, { price:55 });
    const [stateIngredientes, dispatchIngredientes] = useReducer(IngredientsReducer,{names:{}, count:0})
    const [infoInputs, setInfoInputs, resetInfoInputs, initCookiesInputs] = useInputs({
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
    });

    // Fetch ingredients from the server
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
                dispatchIngredientes({ type: 'INIT_NAMES', payload: tempIngredientes });
            })
    }, []);

    return (
        <>
            <BrowserRouter>
                <Header countOrders={countOrders} updateCountOrders={setCountOrders}/>
                <FormInputsContext.Provider value={[infoInputs, setInfoInputs, stateIngredientes, dispatchIngredientes, alerts, setAlerts, statePrice, dispatchPrice, countOrders, setCountOrders]}>
                <Routes>
                    <Route path="/" element={<HomePage initCookiesInputs={initCookiesInputs}/>}/>
                    <Route path="/build" element={<PizzaBuild/>}/>
                    <Route path="/your-info-order" element={<OrderPizzaForm updateLastOrder={setLastOrder} resetInfoInputs={resetInfoInputs}/>} />
                    <Route path="/order-summary" element={<OrderSummary cart={cart} updateCart={setCart} lastOrder={lastOrder}/>} />
                    <Route path="/enter-code" element={<EnterPizzaCode code={code} updateCode={setCode}/>} />
                    <Route path="/prevOrder" element={<CheckPizzaCode code={code} updateCode={setCode}/>}/>
                    <Route path="/cart" element={<Cart cart={cart} updateCart={setCart}/>}/>
                </Routes>
                </FormInputsContext.Provider>
            </BrowserRouter>
        </>
    );
}

export default PizzaOrderRouteTable;