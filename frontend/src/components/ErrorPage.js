import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function ErrorPage(){
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/');
    }, []);
}

export default ErrorPage