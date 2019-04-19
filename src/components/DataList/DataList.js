import React, { Component } from 'react';

import './DataList.css';

class DataList extends Component {
    render() {
        return (
            <React.Fragment>
                <table className="DataList">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip Code</th>
                        <th>Contact</th>
                    </tr>
                    </thead>
                   {
                       this.props.data.map(item => {
                           return (
                            <tbody key={item.id}>
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.city}</td>
                                    <td>{item.state}</td>
                                    <td>{item.zip}</td>
                                    <td>{item.phone}</td>
                                </tr>
                            </tbody>
                           )
                       })
                   }
                </table>
            </React.Fragment>
        );
    }
}

export default DataList;