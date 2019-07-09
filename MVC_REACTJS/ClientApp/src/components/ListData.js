import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { renderDate } from '../Site'

export class ListData extends Component {
    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };

        fetch('api/SampleData/Employees')
            .then(response => response.json())
            .then(data => {
                this.setState({ forecasts: data, loading: false });
            });
    }

    static renderForecastsTable(forecasts) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Join Date</th>
                        <th>Height</th>
                        <th>Weight</th>
                        <th>Department</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map((forecast, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{forecast.employeeName}</td>
                            <td>{renderDate(forecast.joinDate)}</td>
                            <td>{forecast.height}</td>
                            <td>{forecast.weight}</td>
                            <td>{forecast.DepartmentId}</td>
                            <td><a href="javascript;">Edit</a> | <a href="javascript;">Delete</a></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : ListData.renderForecastsTable(this.state.forecasts);

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
