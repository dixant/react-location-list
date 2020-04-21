import React from 'react';
import { Navbar, NavbarBrand } from "reactstrap";
import LocationForm from './LocationForm';

const LocationHeader = () => {
    return (
        <Navbar>
            <NavbarBrand href="/">Location</NavbarBrand>
            <LocationForm buttonLabel = "+ Add Location" className="add-location-form"></LocationForm>
        </Navbar>
    )
}

export default LocationHeader;