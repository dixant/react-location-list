import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Form, FormGroup, Label, Input } from "reactstrap";
import { } from 'reactstrap';

const LocationForm = (props) => {
    const {
        buttonLabel,
        className
    } = props;
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    return (
        <div>
            <Button color="cadet" className="btn-curved" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader>Add Locations</ModalHeader>
                <Form autocomplete="off">
                    <ModalBody>
                        <FormGroup>
                            <Input type="text" autoComplete="off" name="name" id="loc-name" placeholder="1234 Main St" />
                            <Label for="loc-name">Location Name</Label>
                        </FormGroup>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="address1" id="loc-address1" />
                                    <Label for="loc-address1">Address Line 1</Label>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                    <Input type="text" name="suit" id="suit" />
                                    <Label for="suit">Suite No.</Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="address2" id="loc-address2" />
                                    <Label for="loc-address2">Address Line 2</Label>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                            <FormGroup>
                                    <Input type="text" name="city" id="loc-city" />
                                    <Label for="loc-city">Suite No.</Label>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                            <FormGroup>
                                    <Input type="text" name="state" id="loc-state" />
                                    <Label for="loc-state">Suite No.</Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={3}>
                                <FormGroup>
                                    <Input type="text" name="zipcode" id="loc-zipcode" />
                                    <Label for="loc-zipcode">Zip Code</Label>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                            <FormGroup>
                                    <Input type="text" name="phone" id="loc-phone" />
                                    <Label for="loc-phone">Phone Number</Label>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                    <Input type="text" name="timezone" id="loc-timezone" />
                                    <Label for="loc-timezone">Time Zone</Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="facility" id="loc-facility" />
                                    <Label for="loc-facility">Facility Times</Label>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                    <Input type="text" name="appoinment" id="loc-appoinment" />
                                    <Label for="loc-appoinment">Appoinment Pool</Label>
                                </FormGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={toggle}>Cancel</Button>
                        <Button color="cadet" onClick={toggle}>Save</Button>{' '}
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}

export default LocationForm;