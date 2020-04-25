import React from 'react';
import { Navbar, NavbarBrand } from "reactstrap";
import LocationForm from './LocationForm';

const LocationHeader = ({ locationData, addLocationHandler, addLoactionError, addLoactionErrorMsg, closeModal, setCloseModalFalse }) => {
    return (
        <Navbar>
            <NavbarBrand href="/">Location</NavbarBrand>
            <LocationForm buttonLabel="+ Add Location"
                className="add-location-form"
                locationData={locationData}
                closeModal={closeModal}
                addLocationHandler={addLocationHandler}
                addLoactionError={addLoactionError}
                addLoactionErrorMsg={addLoactionErrorMsg}
                setCloseModalFalse={setCloseModalFalse}>
            </LocationForm>
        </Navbar>
    )
}

export default LocationHeader;