function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validate(values, to) {
    let errors = {
        from: {},
        to: {}
    };

    function validateTo(json){
        if (json == null){
            return {};
        } else {
            let errors = {};
            // create empty fields
            for (let key in json){
                errors[key] = {
                    name: "",
                    email: "",
                    phone: ""
                };
                if (json && Object.keys(json).length !== 0) {
                    Object.keys(json).forEach(key => {
                        if (json && json[key] && !json[key].name.trim()){
                            errors[key] && (errors[key].name = "Name is required");
                        }
                        if (json && json[key] && !json[key].email.trim()){
                            errors[key] && (errors[key].email = "Email is required"); 
                        } else if (!validateEmail(json[key].email.trim())){
                            errors[key] && (errors[key].email = "Invalid email"); 
                        }
                        if (!json[key].phone.trim()){
                            errors[key] && (errors[key].phone = "Phone is required"); 
                        } else if (!/\+?\d[\d -]{8,12}\d/.test(json[key].phone.trim())){
                            errors[key] && (errors[key].phone = "Phone invalid");
                        }
                    });
                }
            }
            return errors;
        }
    }

    if (!values.from.name.trim()) {
        errors.from.name = "Name is required";
    }

    if (!values.from.email.trim()) {
        errors.from.email = "Email is required";
    } else if (!validateEmail(values.from.email)){
        errors.from.email = "Invalid email";
    }

    if (!values.from.phone.trim()) {
        errors.from.phone = "Phone is required";
    } else if (!/\+?\d[\d -]{8,12}\d/.test(values.from.phone.trim())){
        errors.from.phone = "Phone number invalid";
    }

    if (values.type == 0) {
        errors.type = "Gift type required";
    }

    if (values.count == 0) {
        errors.count = "No of gifts is required";
    }

    [...Array(values.count).keys()]
        .map(c => "recipient" + c) 
        .forEach(re => {
            errors.to[re] = {name: "", email: "", phone: ""};
        });

    errors.to = validateTo(to);

    return errors;
}

export default validate;
