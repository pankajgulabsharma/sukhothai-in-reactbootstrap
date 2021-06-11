import { useState } from 'react';
import validate from './validateInfo';

const useForm = (cards, validate) => {
    
    // form state
    const [values, setValues] = useState({
        plan: 0,
        GuestName: "",
        GuestEmail: "",
        GuestTelephone: "",
        GuestCity: "",
        tandc: false
    });

    const [errors, setErrors] = useState({});
    const [submit, setSubmit] = useState(false); // flag

    // utils
    function validateValues(){
        setErrors(validate(values));
    }
    
    // form handlers
    function handleChange(e){
        const { name, value } = e.target;
        setValues({...values, [name]: value});
        validateValues();
    }

    function handleRadio(e){
        const { name, id } = e.target;
        setValues({...values, [name]: parseInt(id)});
    }
    
    function handleCheck(e){
        const { checked } = e.target;
        setValues({...values, tandc: checked});
    }

    function handleSubmit(e){
        validateValues();
        if (JSON.stringify(errors) === '{}'){
            console.log("request");
        } else {
            alert("errors in form");
        }
    }

    return {
        values,
        errors,
        submit,
        setSubmit,
        handleChange,
        handleCheck,
        handleSubmit,
        handleRadio,
        validateValues
    };
};

export default useForm;
