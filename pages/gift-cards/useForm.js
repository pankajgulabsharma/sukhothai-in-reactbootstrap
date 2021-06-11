import { useState } from "react";
import { Configure } from 'node-ccavenue';
import sha1 from 'sha1';

const Adler = require('adler-32');

const useForm = (therapies, validate, formRef) => {

    const initialValue = {
        selected: [], // selected therapies
        total: 0,  // total amount
        deal: "", // deal code
        from: {
            name: "",
            email: "",
            phone: ""
        },
        self: false, // gifting self
        count: 0, // no of gifts
        type: 0,
        tandc: false
    };

    const [order, setOrder] = useState(null);
    
    // FORM STATE
    const [values, setValues] = useState({
        selected: [], // selected therapies
        total: 0,  // total amount
        deal: "", // deal code
        from: {
            name: "",
            email: "",
            phone: ""
        },
        self: false, // gifting self
        count: 0, // no of gifts
        type: 0,
        tandc: false
    });

    const [to, setTo] = useState({}); // recieving persons

    const [submit, setSubmit] = useState(false); // flag 
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    // UTIL FUNCTIONS

    function getChecksum(...rest){
        const strJoined = rest.reduce((acc, curr, index, arr) => {
            if (index == (arr.length - 1)){
                return acc;
            } else if (index == 0){
                return curr;
            } else {
                return acc + '|' + String(curr);
            }
        }, "");
        return Adler.str(strJoined);
    }
    
    function convertToApiSendable(values) { // converts values state to format api needs

        /*
          api format : {
          Amount,
          BL_G_NAM,  => Billing Name, person giving Gift
          BL_G_EML, => Billing Email, person giving Gift
          BL_G_TEL, => Billing Mobile No, person giving Gift
          deliveryPerson: [
          {
          DL_G_NAM, => person receiving Gift 
          DL_G_EML, => person receiving Gift 
          DL_G_TEL, => person receiving Gift 
          }
          ], 
          therapyDtl: [
          {
          THRP_AMT: Amount
          THRP_CODE: Code
          THRP_CURR: "INR"
          THRP_NAME: Name
          }
          }
        */

        function sendableTherapies(codes /* [code, ...] */) { // returns sendable format for therapyDtl field
            return therapies.filter(th => codes.includes(th.code)).map(th => {
                return {
                    THRP_AMT: th.price,
                    THRP_CODE: th.code,
                    THRP_CURR: "INR",
                    THRP_NAME: th.name
                };
            });
        }

        function sendableTo(to /* { recipient0: {name, email, phone}, ...}*/) { // returns sendable format for deliveryPerson field
            return [...Array(values.count).keys()]
                .map(count => {
                    const key = "recipient" + count;
                    return {
                        DL_G_NAM: to[key].name,
                        DL_G_EML: to[key].email,
                        DL_G_TEL: to[key].phone
                    };
                });
        }

        let data = {
            Amount: values.total,
            BL_G_NAM: values.from.name,
            BL_G_EML: values.from.email,
            BL_G_TEL: values.from.phone,
            deliveryPerson: [
                sendableTo(to)
            ],
            therapyDtl: [
                sendableTherapies(values.selected)
            ],
        };

        return data;
    }

    function flattenedValues(json){
        const flattened = {
            Amount: String(values.total),
            Order_Id: String(order),
            currency: "INR",
            Redirect_Url: "//psaonline.kesari.in/sukhothai/Online-Gift-Cards-Redirecturl.asp",
            billing_cust_name: json.from.name,
            billing_cust_email: json.from.email,
            billing_cust_tel: json.from.phone,
            Merchant_Id: "M_fin19494_19494",
            Checksum: getChecksum("M_fin19494_19494", String(values.total), order,
                                  "//psaonline.kesari.in/sukhothai/Online-Gift-Cards-Redirecturl.asp",
                                  "diux9vj27foywypwtmhwe9dbja251xvl")
        };

        return Object.keys(flattened).map(key => ({name: String(key), value: flattened[key]}));
    }
    
    function flattenedTo(json){
        return Object.keys(json).map(x => json[x]);
    }

    function getCost(therapyCode) {
        return therapies.filter(th => th.code == therapyCode)[0].price;
    }

    function makeEmptyRecipientFields() {
        // makes empty fields for recipient errors and values
        const keys = [...Array(values.count).keys()].map(c => "recipient" + c); // ["recipient0", "recipient1", ...]

        let emptyRecipient = {
            name: "",
            email: "",
            phone: ""
        };

        let structuredRecipients = {};

        keys.forEach(key => {
            structuredRecipients = { ...structuredRecipients, [key]: emptyRecipient };
        });

        setValues({ ...values, to: structuredRecipients });
    }

    function validateValues() {
        setErrors(validate(values, to));
    }

    function emptyMembers(json){
        if (JSON.stringify(json) == "{}"){
            return [true];
        } else {
            let vals = [];
            for (let k in json){
                if (typeof json[k] == "object"){
                    vals = [...vals, ...emptyMembers(json[k])];
                } else {
                    if (json[k].trim().length != 0){
                        vals = [...vals, false];
                    } else {
                        vals = [...vals, true];
                    }
                }
            }
            return vals;
        }
    }

    function isNull(json){
        if (json == undefined || json == null){
            return false;
        } else if (JSON.stringify(json) === "{}"){
            return true;
        } else {
            return false;
        }
    }
    
    function isDirty() {
        return emptyMembers(errors).every(x => x === true);
    }

    // FORM HANDLERS

    function handleSelection(e) { // handles therapies
        // handles selection of therapies
        const { name, checked } = e.target;
        let copy = [...values.selected];
        if (checked) {
            // checked then add
            setValues({
                ...values,
                selected: [...new Set([...copy, name])],
                total: values.total + getCost(name)
            });
        } else {
            // unchecked then remove
            const filtered = copy.filter(item => item !== name);
            setValues({
                ...values,
                selected: [...filtered],
                total: values.total - getCost(name)
            });
        }
    }

    function handleGiftRecipients(e) {
        // handles all recipients details
        const { name, value } = e.target;
        let pos = name.charAt(name.length - 1); // position
        let attribute = name.slice(0, name.length - 1); // recipient attribute eg: name, email, phone
        let recipientKey = "recipient" + pos; // recipient key eg: recipient0
        let recipient = {
            name: "",
            email: "",
            phone: "",
            ...to["recipient" + pos], // getting prev values
            [attribute]: value // setting new attribute value
        };
        setTo({ ...to, [recipientKey]: recipient });
    }

    function handleDealCode(e) {
        const { value } = e.target;
        setValues({ ...values, deal: value });
    }

    function handleSelf(e) { // handles gifting self check
        const { name, checked } = e.target;
        setValues({ ...values, self: checked });
        if (checked) {
            setValues({...values, type: 1, count: 1});
        }
    }

    function handleGiftAttributes(e) { // handles gift type and gift count
        const { name, value } = e.target;
        setValues({ ...values, [name]: parseInt(value) });
    }

    function handleDetails(e) { // handles details of person gifting
        const { name, value } = e.target;
        setValues({ ...values, from: { ...values.from, [name]: value } });
    }

    function handletandc(e){
        const { checked } = e.target;
        setValues({...values, tandc: checked});
    }

    function handleCancel(e){
        setValues(initialValue);
    }
    
    function handleSubmit(e) {

        validateValues();

        isDirty();

        
        fetch("http://login.sukhothai.in/route/giftCard", {
            mode: "cors",
            method: "post",
            body: JSON.stringify(convertToApiSendable(values)),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setSuccess(true);
                    alert("Success");
                    setOrder(res.data["ORDER_ID"]);
                    setTimeout(() => formRef.current.submit(), 1000);
                }
            })
            .catch(err => alert(err.message));
    }

    function handleBlur(e) {
        validateValues();
    }

    function handleDetails(e) {
        // handles details of person gifting
        const { name, value } = e.target;
        setValues({ ...values, from: { ...values.from, [name]: value } });
    }
    
    return {
        values,
        validateValues,
        to,
        setTo,
        order,
        isDirty,
        setErrors,
        submit,
        setSubmit,
        success,
        setSuccess,
        errors,
        emptyMembers,
        handleSelection,
        handleGiftRecipients,
        handleDealCode,
        handleSelf,
        handleGiftAttributes,
        handleDetails,
        handletandc,
        handleSubmit,
        handleBlur,
        handleCancel,
        flattenedValues,
        flattenedTo,
        getChecksum
    };
};

export default useForm;
