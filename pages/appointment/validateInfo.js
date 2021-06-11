function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validate(values){
    let errors = {};

    // name
    if (values && !values.fullName && !values.fullName.trim()){
        errors.fullName = "Name required";
    } else if (values.fullName.trim().length > 20){
        errors.fullName = "Too long";
    }

    // email
    if (!values.email.trim()){
        errors.email = "Email required";
    } else if (!validateEmail(values.email)){
        errors.email = "Invalid email address";
    }

    // phone
    if (!values.phone.trim()){
        errors.phone = "Phone number required";
    } else if (!/\+?\d[\d -]{8,12}\d/.test(values.phone.trim())){
        errors.phone = "Phone number invalid";
    }

    // sukhothaiLocation
    if (!values.spalocation){
        errors.spalocation = "Location required";
    }

    // noOfPerson
    if (!values.totalperson){
        errors.totalperson = "No of Person required";
    }

    // appointmentDate
    if (!values.datetimepicker1){
        errors.datetimepicker1 = "Appointment date required";
    }

    if (!values.spavisit){
        errors.spavisit = "Visiting time required";
    }

    return errors;
}

export default validate;
