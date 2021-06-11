function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validate(values) {
    let errors = {};

    if (!values.GuestName.trim()) {
        errors.GuestName = "Name is required";
    }

    if (!values.GuestEmail.trim()) {
        errors.GuestEmail = "Email is required";
    } else if (!validateEmail(values.GuestEmail)){
        errors.GuestEmail = "Invalid email";
    }

    if (!values.GuestTelephone.trim()) {
        errors.GuestTelephone = "Phone is required";
    } else if (!/\+?\d[\d -]{8,12}\d/.test(values.GuestTelephone.trim())){
        errors.GuestTelephone = "Phone number invalid";
    }

    if (!values.GuestCity.trim()){
        errors.GuestCity = "City is required";
    }
    
    return errors;
}

export default validate;
