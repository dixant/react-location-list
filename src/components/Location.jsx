import React, { Fragment } from 'react';

import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

import LocationHeader from './LocationHeader';
import LocationBlank from './LocationBlank';
import baseURL from '../constant/network.constant';

import Pagination from './Pagination';
function validateForm(elm = {}) {
    return elm.value.isEmpty()
}
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
                facilityTimes: {},
                appoinmentPool: ''
            },
            addLoactionError: false,
            addLoactionErrorMsg: '',
            closeModal: false,
            locationList: [],
            holdAllLocationList: [],
            options: {
                limit: 10,
                page: 1,
                totalCount: 0
            }
        }
    }

    addLocationHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        let { name, city, state, zipcode, phone, timezone, facility, appoinment } = e.currentTarget.elements || {},
            addLoactionError = false, addLoactionErrorMsg = "";


        if (validateForm(name)) {
            addLoactionError = true;
            addLoactionErrorMsg = "Location Name is Required";
        }
        else if (validateForm(city)) {
            addLoactionError = true;
            addLoactionErrorMsg = "City is Required";
        }
        else if (validateForm(state)) {
            addLoactionError = true;
            addLoactionErrorMsg = "State is Required";
        }
        else if (!validateForm(zipcode) && (zipcode.value.length > 10 || zipcode.value.length < 5)) {
            addLoactionError = true;
            addLoactionErrorMsg = "Zip Code should be 5 to 10 length";
        }
        else if (validateForm(phone)) {
            addLoactionError = true;
            addLoactionErrorMsg = "Phone is Required";
        }
        else if (parseInt(phone.value.length) !== 14) {
            addLoactionError = true;
            addLoactionErrorMsg = "Phone Number should be 10 digit";
        }
        else if (validateForm(timezone)) {
            addLoactionError = true;
            addLoactionErrorMsg = "Time Zone is Required";
        }

        if (!!addLoactionError) {
            this.setState({ addLoactionError, addLoactionErrorMsg });
            return false;
        }

        const formData = {
            locationName: name.value,
            city: city.value,
            state: state.value,
            zipCode: zipcode.value,
            phone: phone.value,
            timeZone: timezone.value,
            facilityTimes: JSON.parse(facility.dataset.objectvalue),
            appoinmentPool: appoinment.value
        }

        const myRequest = new Request(`${baseURL}locations`, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify(formData)
        });
        fetch(myRequest)
            .then(res => res.json())
            .then(response => {
                if (response) {
                    this.setState({
                        addLoactionError,
                        addLoactionErrorMsg,
                        holdAllLocationList: [...this.state.holdAllLocationList, response],
                        closeModal: true
                    })
                }
            })


    }
    setCloseModalFalse() {
        this.setState({
            closeModal: false,
            location: {
                locationName: '',
                city: '',
                state: '',
                zipCode: '',
                phone: '',
                timeZone: '',
                facilityTimes: {},
                appoinmentPool: ''
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.holdAllLocationList.length !== this.state.holdAllLocationList.length) {
            let holdAllLocationList = this.state.holdAllLocationList,
                totalCount = holdAllLocationList.length,
                { limit, page } = this.state.options,
                start = (limit * page) - limit, end = start + limit,
                locationList = holdAllLocationList.slice(start, end);
            if (!locationList.length) {
                page = page - 1 || 1;
                start = (limit * page) - limit;
                end = start + limit;
                locationList = holdAllLocationList.slice(start, end);
            }
            this.setState((prev) => {
                return {
                    holdAllLocationList,
                    locationList,
                    options: {
                        ...prev.options,
                        totalCount,
                        page
                    }
                }
            })
        }

    }
    componentDidMount() {

        let myRequest = new Request(`${baseURL}locations`, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'GET'
        });
        fetch(myRequest)
            .then(res => res.json())
            .then(response => {
                //add pagination option to widget
                const holdAllLocationList = response,
                    totalCount = holdAllLocationList.length,
                    { limit, page } = this.state.options,
                    start = (limit * page) - limit, end = start + limit,
                    locationList = holdAllLocationList.slice(start, end);

                if (totalCount) {
                    this.setState((prev) => {
                        return {
                            holdAllLocationList,
                            locationList,
                            options: {
                                ...prev.options,
                                totalCount
                            }
                        }
                    })
                }

            })
    }
    onChange(data) {
        const { options: { limit: preLimit, page: prePage }, holdAllLocationList } = this.state,
            { limit = preLimit, page = prePage } = data,
            start = (limit * page) - limit, end = start + limit,
            locationList = holdAllLocationList.slice(start, end);
        this.setState({ locationList, options: Object.assign(this.state.options, data) })
    }
    editLocationHandler(id){
        let editObject = this.state.locationList.filter(location => location.id === id)[0];
        if(editObject){
            console.log(editObject)
            this.setState({
                Location: editObject,
            })
        }
    }
    removeLocationHandler(id) {
        let myRequest = new Request(`${baseURL}locations/${id}`, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'DELETE'
        });
        fetch(myRequest)
            .then(res => res.json())
            .then(response => {
                let holdAllLocationListData = this.state.holdAllLocationList;
                let updatedData = holdAllLocationListData.filter(elm => elm.id !== id);
                this.setState({ holdAllLocationList: [...updatedData] })
            })
    }
    render() {
        let { location, locationList, addLoactionError, addLoactionErrorMsg, closeModal, options, holdAllLocationList } = this.state;
        return (
            <>
                <LocationHeader locationData={location}
                    closeModal={closeModal}
                    addLocationHandler={this.addLocationHandler.bind(this)}
                    addLoactionError={addLoactionError}
                    addLoactionErrorMsg={addLoactionErrorMsg}
                    setCloseModalFalse={this.setCloseModalFalse.bind(this)}
                />
                {!!holdAllLocationList.length && <Table responsive className="location-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Location Name</th>
                            <th>Address</th>
                            <th>Phone No.</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {locationList.map(({ id, locationName, city, state, zipCode, phone }) => (
                            <tr key={id}>
                                <td><span className="round">{id}</span></td>
                                <td>{locationName}</td>
                                <td>{`${city}, ${state} ${zipCode.length ? `, ${zipCode}` : ''}`}</td>
                                <td>{phone}</td>
                                <td>
                                    <FontAwesomeIcon
                                        className="action-icon edit"
                                        icon={faPen}
                                        title="edit"
                                        onClick={this.editLocationHandler.bind(this, id)}></FontAwesomeIcon>

                                    <FontAwesomeIcon
                                        className="action-icon delete"
                                        icon={faTrash}
                                        title="delete"
                                        onClick={this.removeLocationHandler.bind(this, id)}></FontAwesomeIcon>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                    <tfoot>
                        <Pagination
                            options={options}
                            onChange={this.onChange.bind(this)}
                        > </Pagination>
                    </tfoot>
                </Table>}
                {!locationList.length && <LocationBlank
                    heading="Kindly Add Your Location First"
                    subHeading="There is no location added right now">
                </LocationBlank>}
            </>
        )
    }
}

export default Location;