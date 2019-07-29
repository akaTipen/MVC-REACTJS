import React, { Component } from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import DatePicker from 'react-datepicker';
import { renderDateInsert } from '../Site'

export class EmployeeData {
    employeeId = 0;
    employeeName = "";
    joinDate = "";
    height = "";
    weight = "";
    departmentId = "";
}

export class AddList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            startDate: new Date(),
            DepList: [],
            empData: new EmployeeData(),
        };

        // This binding is necessary to make "this" work in the callback
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);

        const { data } = this.props.location;

        // This will set state for Edit employee
        if (data > 0) {
            fetch('api/SampleData/EmployeeDetail/' + data)
                .then(response => response.json())
                .then(data => {
                    this.setState({ title: "Edit", startDate: new Date(data.joinDate), empData: data });
                });
        }

        // This will set state for Add employee
        else {
            this.state = { title: "Create", startDate: new Date(), DepList: [], empData: new EmployeeData() };
        }

        fetch('api/SampleData/DepartementList')
            .then(response => response.json())
            .then(data => {
                this.setState({ DepList: data });
            });
    }

    //handle date picker
    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    //handle submit
    handleSave(event) {
        event.preventDefault();
        var data = new FormData(event.target);
        data.set("JoinDate", renderDateInsert(data.get("JoinDate")));

        // PUT request for Edit employee.  
        if (this.state.empData.employeeId !== 0) {
            fetch('api/SampleData/UpdateEmployee', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log('Success:', JSON.stringify(responseJson));
                    this.props.history.push("/list-data");                  
                })
                .catch(error => console.error('Error:', error));
        }

        // POST request for Add employee.
        else {
            fetch('api/SampleData/AddEmployee', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log('Success:', JSON.stringify(responseJson));
                    this.props.history.push("/list-data");
                })
                .catch(error => console.error('Error:', error));
        }
    };

    render() {
        return (
            <Row>
                <Col xs="12">
                    <h2>{this.state.title}</h2>
                    <h4>Insert Employee</h4>
                    <hr />
                </Col>
                <Col xs="6">
                    <Form onSubmit={this.handleSave}>
                        <input type="hidden" name="EmployeeId" value={this.state.empData.employeeId} />
                        <FormGroup row>
                            <Label sm={3} for="EmployeeName">Nama</Label>
                            <Col sm={9}>
                                <Input type="text" name="EmployeeName" defaultValue={this.state.empData.employeeName} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3} for="JoinDate">Join Date</Label>
                            <Col sm={9}>
                                <DatePicker className="form-control" name="JoinDate" dateFormat="dd-MM-yyyy" selected={this.state.startDate} onChange={this.handleChange} autoComplete='off' />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3} for="Height">Height</Label>
                            <Col sm={9}>
                                <Input type="number" name="Height" defaultValue={this.state.empData.height} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3} for="Weight">Weight</Label>
                            <Col sm={9}>
                                <Input type="number" name="Weight" defaultValue={this.state.empData.weight} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3} for="Photo">Photo</Label>
                            <Col sm={9}>
                                <Input type="file" name="Photo" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3} for="DepartmentId">Department</Label>
                            <Col sm={9}>
                                <select className="form-control" data-val="true" name="DepartmentId" defaultValue={this.state.empData.departmentId}>
                                    {this.state.DepList.map((val, index) =>
                                        <option key={index} value={val.value}>{val.text}</option>
                                    )}
                                </select>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={{ size: 2, order: 1, offset: 3 }}>
                                <Button type="submit" outline color="success">Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        );
    }
}
