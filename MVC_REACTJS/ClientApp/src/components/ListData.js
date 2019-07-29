import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { renderDate } from '../Site'

export class ListData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forecasts: [],
            loading: true
        };

        // This binding is necessary to make "this" work in the callback  
        this.getClientReport = this.getClientReport.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.renderForecastsTable = this.renderForecastsTable.bind(this);

        fetch('api/SampleData/Employees')
            .then(response => response.json())
            .then(data => {
                this.setState({ forecasts: data, loading: false });
            });
    }

    //handle download file
    getClientReport(id) {
        //alert('test')
        window.open('/Dwonload/GetReport/' + id, "_blank");
    }

    handleDelete(id) {
        if (!window.confirm("Do you want to delete employee with Id: " + id))
            return;
        else {
            fetch('api/SampleData/DeleteEmployee/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        empList: this.state.forecasts.filter((rec) => {
                            return (rec.employeeId !== id);
                        })
                    });
            });
        }  
    }

    //handle table
    renderForecastsTable(forecasts) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Join Date</th>
                        <th>Photo</th>
                        <th>Height</th>
                        <th>Weight</th>
                        <th>Department</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map((forecast, index) =>
                        <tr key={forecast.employeeId}>
                            <td>{index + 1}</td>
                            <td>{forecast.employeeName}</td>
                            <td>{renderDate(forecast.joinDate)}</td>
                            <td><button className="btn btn-link" onClick={() => this.getClientReport(forecast.employeeId)}>Download File</button></td>
                            <td>{forecast.height}</td>
                            <td>{forecast.weight}</td>
                            <td>{forecast.departmentName}</td>
                            <td>
                                <Link className="btn btn-link" to={{ pathname: "/add-list/", data: forecast.employeeId}}>Edit</Link>
                                <button className="btn btn-link" onClick={() => this.handleDelete(forecast.employeeId)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderForecastsTable(this.state.forecasts);

        return (
            <div>
                <h2>List Employee</h2>
                <Link to='/add-list'>Create New</Link>
                <br /><br />

                {contents}
            </div>
        );
    }
}