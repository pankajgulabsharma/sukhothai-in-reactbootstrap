import { useState } from 'react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const useForm = () => {

    const [values, setValues] = useState({
        location: {lat: null, lng: null},
        distance: 10,
        results: 25
    });

    const [address, setAddress] = useState("");

    const [loc, setLoc] = useState("");
    
    function handleLocation(e){
        setValues({...values, location: e});
    }
    
    function handleAddressChange(e){
        setAddress(e);
    }

    function handleLocationSelect(e){
        geocodeByAddress(e)
            .then(async results => {
                const newAddress = results[0].formatted_address
                      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
                      .split(" ")
                      .slice(0, 2)
                      .join(" ");
                await handleAddressChange(newAddress);
                return getLatLng(results[0]);
            })
            .then(async latLng => {
                const newValues = {
                    ...values,
                    location: latLng,
                };
                await setValues(newValues);
            })
            .catch(error => console.error('Error', error));
    }

    function handleSelect(e){ // dropdown
        const { name, value } = e.target;
        setValues({...values, [name]: parseInt(value)});
    }

    return {
        values,
        address,
        handleAddressChange,
        handleLocationSelect,
        handleSelect,
        handleLocation
    };
};

export default useForm;
