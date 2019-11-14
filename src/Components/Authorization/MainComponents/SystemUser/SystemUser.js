import React, { Component } from 'react';
import {BootstrapTable, 
    TableHeaderColumn} from 'react-bootstrap-table';
import './SystemUser.css';
import { getFilials as printFilials} from '../../../../libs/effects';


class SystemUser extends Component {
    // state = {
    //     data: []
    // }

    // componentDidMount() {
    //     printFilials().then(response => {
    //         console.log(response)
    //         this.setState({data: response})
    //     });
    // }
    informationUser(){
        return <h1>Hello</h1>
    }

    render() {
        return (
            // <BootstrapTable data={this.state.data}>
            //     <TableHeaderColumn isKey dataField='id_filial' dataAlign='center'>№</TableHeaderColumn>
            //     <TableHeaderColumn dataField='address' dataAlign='center'>Адрес банковского филиала</TableHeaderColumn>
            //     <TableHeaderColumn dataField='phone_number' dataAlign='center'>Контактный номер телефона</TableHeaderColumn>
            // </BootstrapTable>
            <div><this.informationUser /></div>
        );
    }
}

export default SystemUser;