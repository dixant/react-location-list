import React from 'react';
import { Navbar, NavbarBrand } from "reactstrap";
import LocationForm from './LocationForm';

const LocationHeader = ({ locationData, addLocationHandler, addLoactionError, addLoactionErrorMsg }) => {
    return (
        <Navbar>
            <NavbarBrand href="/">Location</NavbarBrand>
            <LocationForm buttonLabel="+ Add Location"
                className="add-location-form"
                locationData={locationData}
                addLocationHandler={addLocationHandler}
                addLoactionError={addLoactionError}
                addLoactionErrorMsg={addLoactionErrorMsg}>
            </LocationForm>
        </Navbar>
    )
}

export default LocationHeader;