import {useEffect, useState} from "react";
import {Col} from "react-bootstrap";

function UseInputs(){
    const [infoInputs, setInfoInputs] = useState({
        firstName:"",
        lastName:"",
        street:"",
        house:"",
        number:"",
        city:"",
        phone:""
    });

    useEffect(() => {
        fetch("/cookies/get", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if(res.ok)
                    return res.json()
                else
                    return Promise.reject(res.status);
            })
            .then(response => {
                const tempInputs = {};
                response.forEach(cookie => {
                    tempInputs[cookie.name] = cookie.value;
                });
                setInfoInputs(tempInputs);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    return [infoInputs, setInfoInputs];
}

export default UseInputs;