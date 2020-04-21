import React from 'react';
import NoLocation from '../images/no-location.png';

const LocationBlank = ({ heading = '', subHeading = '' }) => {
    return (
        <div className="d-center">
            <img src={NoLocation} alt="no location"></img>
            <div className="dark">{heading}</div>
            <div className="light small">{subHeading}</div>
        </div>
    )
}
export default LocationBlank;