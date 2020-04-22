import React, { Fragment } from 'react';
import LocationHeader from './LocationHeader';
import LocationBlank from './LocationBlank';

class Location extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                locationName: '',
                city: '',
                state: '',
                zipCode: '',
                phone: '',
                timeZone: '',
                facilityTimes: [],
                appoinmentPool: ''
            },
            addLoactionError: false,
            addLoactionErrorMsg: '',
            locationList: []
        }
    }
    addLocationHandler(e) {

        e.preventDefault();
        e.stopPropagation();
        let { name, city, state, zipcode, phone, timezone, appoinment } = e.currentTarget.elements;
        
        
        if (!name.value.length || name.value.trim() === "") {
            this.setState({ addLoactionError: true, addLoactionErrorMsg: "Location Name is Required" });
            return false;
        }
        else if (!city.value.length || city.value.trim() === "") {
            this.setState({ addLoactionError: true, addLoactionErrorMsg: "City is Required" });
            return false;
        }
        else if (!state.value.length || state.value.trim() === "") {
            this.setState({ addLoactionError: true, addLoactionErrorMsg: "State is Required" });
            return false;
        }
        else if (zipcode.value.length && zipcode.value.trim() !== "") {
            if (zipcode.value.length > 10 || zipcode.value.length < 5) {
                this.setState({ addLoactionError: true, addLoactionErrorMsg: "Zip Code should be 5 to 10 length" });
                return false;
            }

        }
        else if (!phone.value.length || phone.value.trim() === "") {
            this.setState({ addLoactionError: true, addLoactionErrorMsg: "Phone is Required" });
            return false;
        }
        else if (!timezone.value.length || timezone.value.trim() === "") {
            this.setState({ addLoactionError: true, addLoactionErrorMsg: "Time Zone is Required" });
            return false;
        }


        let formData = {
            locationName: name.value,
            city: city.value,
            state: state.value,
            zipCode: zipcode.value,
            phone: phone.value,
            timeZone: timezone.value,
            facilityTimes: [],
            appoinmentPool: appoinment.value
        }
        console.log(formData)
        this.setState({ addLoactionError: false, addLoactionErrorMsg: "" })

    }
    render() {
        let { location, addLoactionError, addLoactionErrorMsg } = this.state;
        return (
            <Fragment>
                <LocationHeader locationData={location}
                    addLocationHandler={this.addLocationHandler.bind(this)}
                    addLoactionError={addLoactionError}
                    addLoactionErrorMsg={addLoactionErrorMsg}
                />
                {/* <Data></Data> */}
                <LocationBlank
                    heading="Kindly Add Your Location First"
                    subHeading="There is no location added right now">
                </LocationBlank>
            </Fragment>
        )
    }
}

export default Location;