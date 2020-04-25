import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Form, FormGroup, Label, Input, Table, ButtonGroup } from "reactstrap";

import USStateList from '../data/USStateList';
import timezones from '../data/timezones';
import facilityData from '../data/facilityData';

const formatPhone = (value) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;
    if (cvLength < 4) return currentValue;
    if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
};
const formatZip = (value, previousValue) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\da-zA-Z]/g, '');
    const cvLength = currentValue.length;
    if (!previousValue || value.length > previousValue.length) {
        if (cvLength < 10) return currentValue;
        return currentValue.slice(0, 10)
    }
}


const LocationForm = ({ buttonLabel, className, locationData, addLocationHandler, addLoactionError, addLoactionErrorMsg, showModal, showModalMode, toggleModal }) => {
    const [nestedModal, setNestedModal] = useState(false);
    const [location, setLocation] = useState(locationData);
    const [facility, setFacility] = useState(facilityData);


    useEffect(() => {
        setLocation(locationData);

    }, [locationData]);

    const toggleNested = () => setNestedModal(!nestedModal);

    const { locationName, city, state, zipCode, phone, timeZone, facilityTimes, appoinmentPool } = location;

    const handlePhoneChange = (value) => {
        setLocation(prev => {
            return ({ ...prev, phone: formatPhone(value) })
        })
    };
    const handleZipCodeChange = (value) => {
        setLocation(prev => {
            return ({ ...prev, zipCode: formatZip(value, prev.zipCode) })
        })
    };
    const handleTimeChange = (target, fromto) => {
        let { name, value } = target;
        let facilityData = facility["facility"];
        let currentFacility = facilityData[name];
        currentFacility = {
            day: currentFacility.day,
            checked: currentFacility.checked,
            fromTime: fromto === "fromtime" ? value : currentFacility.fromTime,
            fromAmPm: currentFacility.fromAmPm,
            toTime: fromto === "totime" ? value : currentFacility.toTime,
            toAmPm: currentFacility.toAmPm
        }
        facilityData[name] = currentFacility;
        setFacility(prev => {
            return ({ facility: facilityData })
        })
    }
    const applyToAllChecked = (currentTarget, rowData) => {
        let facilityData = facility["facility"];
        let newTarget = {};
        Object.values(facilityData).map((v, i) => {
            if (v.checked === true) {
                v.fromTime = rowData.fromTime;
                v.fromAmPm = rowData.fromAmPm;
                v.toTime = rowData.toTime;
                v.toAmPm = rowData.toAmPm;
            }
            newTarget[v.day] = v;
            return 0;
        })
        setFacility(prev => {
            return ({ facility: newTarget })
        })
    }
    const handleAMPMChange = (currentTarget, fromto) => {
        let { name, value } = currentTarget;
        let facilityData = facility["facility"];
        let currentFacility = facilityData[name];
        currentFacility = {
            day: currentFacility.day,
            checked: currentFacility.checked,
            fromTime: currentFacility.fromTime,
            fromAmPm: fromto === "fromtime" ? value : currentFacility.fromAmPm,
            toTime: currentFacility.toTime,
            toAmPm: fromto === "totime" ? value : currentFacility.toAmPm
        }
        facilityData[name] = currentFacility;
        setFacility(prev => {
            return ({ facility: facilityData })
        })
    }
    const formatTime = (time, day, fromto) => {
        let hr = 0,
            min = 0,
            ampm = "AM"
        if (!time) {
            hr = 12
        }
        else {
            const currentTime = time.replace(/[^\d:]/g, '');
            if (!currentTime) {
                hr = 12
            } else {
                if (currentTime.includes(":")) {
                    hr = parseInt(currentTime.substring(0, currentTime.indexOf(":")).substring(0, 2)) || 12;
                    ampm = hr > 12 && hr <= 24 ? "PM" : hr > 24 ? "PM" : "AM";
                    hr = hr > 12 && hr <= 24 ? hr - 12 : hr > 24 ? 12 : hr;

                    min = parseInt(currentTime.substring(currentTime.indexOf(":") + 1, currentTime.indexOf(":") + 3)) || 0
                    if (min > 59) {
                        min = 59;
                    }
                }
                else {
                    hr = parseInt(currentTime.substring(0, 2)) || 12
                    ampm = hr > 12 && hr <= 24 ? "PM" : hr > 24 ? "PM" : "AM";
                    hr = hr > 12 && hr <= 24 ? hr - 12 : hr > 24 ? 12 : hr;
                }
            }
        }
        let hour = hr < 10 ? `0${hr}` : hr;
        let minute = min < 10 ? `0${min}` : min;
        let facilityData = facility["facility"];
        let currentFacility = facilityData[day];
        currentFacility = {
            day: currentFacility.day,
            checked: currentFacility.checked,
            fromTime: fromto === "fromtime" ? `${hour}:${minute}` : currentFacility.fromTime,
            fromAmPm: fromto === "fromtime" ? ampm : currentFacility.fromAmPm,
            toTime: fromto === "totime" ? `${hour}:${minute}` : currentFacility.toTime,
            toAmPm: fromto === "totime" ? ampm : currentFacility.toAmPm
        }
        facilityData[day] = currentFacility;
        setFacility(prev => {
            return ({ facility: facilityData })
        })
    }
    const handleCheckedDays = (cTarget) => {
        let { name, checked } = cTarget;
        let facilityData = facility["facility"];
        let currentFacility = facilityData[name];
        currentFacility = {
            day: currentFacility.day,
            checked: checked,
            fromTime: currentFacility.fromTime,
            fromAmPm: currentFacility.fromAmPm,
            toTime: currentFacility.toTime,
            toAmPm: currentFacility.toAmPm
        }
        facilityData[name] = currentFacility;
        setFacility(prev => {
            return ({ facility: facilityData })
        })

    }
    const saveFacility = () => {
        let facilityData = facility["facility"];
        let availableFacility = {};
        Object.values(facilityData).map((v, i) => {
            if (v.checked === true) {
                availableFacility[v.day] = v;
            }
            return 0;
        })
        setLocation(prev => {
            return ({ ...prev, facilityTimes: availableFacility })
        })
        setNestedModal(!nestedModal)
    }
    const getFacility = () => {
        return (Object.values(facility.facility).map((v, i) => {
            return (
                <tr key={i}>
                    <th >
                        <FormGroup inline className="day-check">
                            <Label className="day-label">
                                <Input type="checkbox"
                                    name={v.day}
                                    checked={v.checked}
                                    className="day-input"
                                    onChange={({ currentTarget }) => {
                                        handleCheckedDays(currentTarget)

                                    }} />
                                {v.day}
                            </Label>
                        </FormGroup>
                    </th>
                    <td>
                        <Input className="facility-time" pattern="\d{1,2}:\d{2}([ap]m)?"
                            name={v.day}
                            type="text"
                            value={v.fromTime}
                            disabled={!v.checked}
                            onBlur={({ target: { value, name } }) => formatTime(value, name, "fromtime")}
                            onChange={({ target }) => { handleTimeChange(target, "fromtime") }} />
                        <ButtonGroup className="am-pm-group">
                            <Button color="cadet-toggle"
                                active={v.fromAmPm === 'AM'}
                                name={v.day}
                                value="AM"
                                disabled={!v.checked}
                                onClick={({ currentTarget }) => { handleAMPMChange(currentTarget, "fromtime") }}
                            >AM</Button>
                            <Button color="cadet-toggle"
                                active={v.fromAmPm === 'PM'}
                                name={v.day}
                                value="PM"
                                disabled={!v.checked}
                                onClick={({ currentTarget }) => { handleAMPMChange(currentTarget, "fromtime") }}
                            >PM</Button>
                        </ButtonGroup>

                    </td>
                    <td>
                        <Input className="facility-time"
                            name={v.day}
                            type="text"
                            value={v.toTime}
                            disabled={!v.checked}
                            onBlur={({ target: { value, name } }) => formatTime(value, name, "totime")}
                            onChange={({ target }) => { handleTimeChange(target, "totime") }} />
                        <ButtonGroup className="am-pm-group" >
                            <Button color="cadet-toggle"
                                active={v.toAmPm === 'AM'}
                                name={v.day}
                                value="AM"
                                disabled={!v.checked}
                                onClick={({ currentTarget }) => { handleAMPMChange(currentTarget, "totime") }}
                            >AM</Button>
                            <Button color="cadet-toggle"
                                active={v.toAmPm === 'PM'}
                                name={v.day}
                                value="PM"
                                disabled={!v.checked}
                                onClick={({ currentTarget }) => { handleAMPMChange(currentTarget, "totime") }}
                            >PM</Button>
                        </ButtonGroup>
                    </td>
                    <td>
                        <Button outline color="cadet"
                            className="pull-right"
                            value={v}
                            name={v.day}
                            disabled={!v.checked}
                            onClick={({ currentTarget }) => { applyToAllChecked(currentTarget, v) }}
                        >Apply to all Checked</Button>{' '}
                    </td>
                </tr>
            )
        }))
    }
    const getFacilityDisplay = (data) => {
        let displayData = [];
        if (data !== {}) {
            Object.values(data).map(v => {
                let temp = `[${v.day}, ${v.fromTime}${v.fromAmPm} - ${v.toTime}${v.toAmPm}]`
                displayData.push(temp)
                return 0;
            })
            displayData = displayData.join(' ')
            return displayData
        }
        else return ''

    }
    const appoinmentPoolHandler = (value) => {
        let newPool = []
        let valueArr = []
        if (value && value.length > 0) {
            valueArr = value.split(',');
            valueArr.map((v) => {
                if (v) { newPool.push(v.trim()) }
                return 0;
            })
        }
        setLocation(prev => {
            return ({ ...prev, appoinmentPool: newPool.join(",") })
        })
    }
    return (
        <div>
            <Button color="cadet" className="btn-curved" onClick={toggleModal}>{buttonLabel}</Button>
            <Modal isOpen={showModal} className={className} backdrop={false}>
                <ModalHeader>Add Locations</ModalHeader>
                <Form autoComplete="off" onSubmit={e => addLocationHandler(showModalMode, location, e)}>
                    <ModalBody>
                        <FormGroup>
                            <Input type="text"
                                autoComplete="off"
                                name="name"
                                id="loc-name"
                                value={locationName}
                                onChange={({ target: { value } }) => {
                                    setLocation(prev => {
                                        return { ...prev, locationName: value }
                                    })
                                }} />
                            <Label for="loc-name">Location Name*</Label>
                        </FormGroup>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="city" id="loc-city"
                                        value={city}
                                        onChange={({ target: { value } }) => {
                                            setLocation(prev => {
                                                return ({ ...prev, city: value })
                                            })
                                        }} />
                                    <Label for="loc-city">City*</Label>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Input
                                        type="select"
                                        name="state" id="loc-state"
                                        value={state}
                                        onChange={({ target: { value } }) => {
                                            setLocation(prev => {
                                                return ({ ...prev, state: value })
                                            })
                                        }}>
                                        {USStateList.map((v, i) => (
                                            <option key={i} value={v.abbreviation}>{`${v.abbreviation} - ${v.name}`}</option>
                                        ))}
                                    </Input>
                                    <Label for="loc-state">State*</Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={3}>
                                <FormGroup>
                                    <Input type="text" name="zipcode" id="loc-zipcode"
                                        value={zipCode}
                                        onChange={({ target: { value } }) => {
                                            handleZipCodeChange(value)
                                        }}
                                    />
                                    <Label for="loc-zipcode">Zip Code</Label>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Input type="text" name="phone" id="loc-phone"
                                        placeholder="(xxx) xxx-xxxx"
                                        value={phone}
                                        onChange={({ target: { value } }) => {
                                            handlePhoneChange(value)
                                        }}
                                    />
                                    <Label for="loc-phone">Phone Number*</Label>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Input
                                        type="select"
                                        name="timezone" id="loc-timezone"
                                        value={timeZone}
                                        onChange={({ target: { value } }) => {
                                            setLocation(prev => {
                                                return ({ ...prev, timeZone: value })
                                            })
                                        }}>
                                        {timezones.map((v, i) => (
                                            <option key={i} value={v.offset}>{v.offset} {v.name}</option>
                                        ))}
                                    </Input>
                                    <Label for="loc-timezone">Time Zone*</Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="facility"
                                        id="loc-facility"
                                        data-objectvalue={JSON.stringify(facilityTimes)}
                                        value={getFacilityDisplay(facilityTimes)}
                                        onChange={(e) => { }}
                                        onClick={toggleNested} />
                                    <Label for="loc-facility">Facility Times</Label>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="appoinment" id="loc-appoinment"
                                        value={appoinmentPool}
                                        onChange={({ target: { value } }) => {
                                            setLocation(prev => {
                                                return ({ ...prev, appoinmentPool: value })
                                            })

                                        }}
                                        onBlur={({ target: { value } }) => {
                                            appoinmentPoolHandler(value)

                                        }} />
                                    <Label className="appoinment-label" for="loc-appoinment">Appoinment Pool</Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        {appoinmentPool.length > 0 && (appoinmentPool.split(',').map((v, i) => {
                            if (v && v.trim() !== "") {
                                return (
                                    <span className="tag-span" key={i}>{v}</span>
                                )
                            } else { return null }

                        }))}
                        {addLoactionError && <div className="errorMsg">{addLoactionErrorMsg}</div>}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={toggleModal}>Cancel</Button>
                        {showModalMode === "create" && <Button color="cadet" type="submit" >Save</Button>}
                        {showModalMode === "edit" && <Button color="cadet" type="submit" >Update</Button>}

                    </ModalFooter>
                </Form>
            </Modal>
            <Modal isOpen={nestedModal} toggle={toggleNested} className={className} backdrop={false} keyboard={false}>
                <ModalHeader>Facility Times</ModalHeader>
                <ModalBody>
                    <Table borderless>
                        <thead>
                            <tr>
                                <th></th>
                                <th>From</th>
                                <th>To</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {getFacility()}

                        </tbody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={toggleNested}>Cancel</Button>{' '}
                    <Button color="cadet"
                        name="saveFacility"
                        onClick={(e) => {
                            saveFacility()
                        }}>Save</Button>{' '}
                </ModalFooter>
            </Modal>
        </div >
    )
}

export default LocationForm;