import React, { Component } from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import DatePicker from 'react-datepicker';

export class AddList extends Component {
    static displayName = AddList.name;

    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    render() {
        return (
            <Row>
                <Col xs="12">
                    <h2>Create</h2>
                    <h4>Insert Employee</h4>
                    <hr />
                </Col>

                <Col xs="6">
                    <Form>
                        <FormGroup row>
                            <Label sm={3} for="txtNama">Nama</Label>
                            <Col sm={9}>
                                <Input type="text" name="txtNama" id="txtNama" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3} for="txtJoinDate">Join Date</Label>
                            <Col sm={9}>
                                <DatePicker name="txtJoinDate" id="txtJoinDate" selected={this.state.startDate} onChange={this.handleChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3} for="txtHeight">Height</Label>
                            <Col sm={9}>
                                <Input type="number" name="txtHeight" id="txtHeight" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3} for="txtWeight">Weight</Label>
                            <Col sm={9}>
                                <Input type="number" name="txtWeight" id="txtWeight" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3} for="txtPhoto">Weight</Label>
                            <Col sm={9}>
                                <Input type="file" name="txtPhoto" id="txtPhoto" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3} for="ddlDepartment">Department</Label>
                            <Col sm={9}>
                                <Input type="select" name="ddlDepartment" id="ddlDepartment">
                                    <option>DPSI</option>
                                    <option>PKSI</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={{ size: 2, order: 1, offset: 3 }}>
                                <Button outline color="success">Submit</Button>
                            </Col>
                        </FormGroup>
                        
                    </Form>
                </Col>
            </Row>
        );
    }
}
