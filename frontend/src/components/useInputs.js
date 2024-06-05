import {useEffect, useState} from "react";
import {Col} from "react-bootstrap";

/**
 * Custom hook for managing form inputs.
 * @param {Object} init - Initial state for form inputs.
 * @returns {[Object, function, function]} - Array containing form inputs state, setter function, and reset function.
 */
function UseInputs(init){
    const [infoInputs, setInfoInputs] = useState(init);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if(!initialized) {
            initCookiesInputs();
        }
        setInitialized(true);
    }, [initialized]);

    /**
     * Function to initialize form inputs from cookies.
     */
    const initCookiesInputs = () => {
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

    /**
     * Function to reset form inputs to their initial state.
     */
    const resetInfoInputs = () => {
        setInfoInputs(init);
    };

    return [infoInputs, setInfoInputs, resetInfoInputs];
}

export default UseInputs;