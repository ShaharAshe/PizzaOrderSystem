import {useEffect, useState} from "react";
import {Col} from "react-bootstrap";

function UseInputs(init){
    const [infoInputs, setInfoInputs] = useState(init);
    const [initialized, setInitialized] = useState(false);
    useEffect(() => {
        if(!initialized) {
            fetch("/cookies/get", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if (res.ok)
                        return res.json();
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
        }
        setInitialized(true);
    }, [initialized]);

    return [infoInputs, setInfoInputs];
}

export default UseInputs;