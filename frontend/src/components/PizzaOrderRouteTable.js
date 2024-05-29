import {BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import PizzaBuild from "./PizzaBuild";
import CheckPizzaCode from "./CheckPizzaCode";
import Header from "./Header";
import {useContext} from "react";

function PizzaOrderRouteTable(){
    return (
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/build" element={<PizzaBuild/>}/>
                    <Route path="/prevOrder" element={<CheckPizzaCode/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default PizzaOrderRouteTable;