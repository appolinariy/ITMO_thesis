import React, { Component } from 'react';
import {BootstrapTable, 
    TableHeaderColumn} from 'react-bootstrap-table';
import './Filial.css';
import { getFilials as printFilials} from '../../../../libs/effects';


class Filial extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        printFilials().then(response => {
            console.log(response)
            this.setState({data: response})
        });
    }

    render() {
        return (
            <BootstrapTable className='filial' data={this.state.data}>
                <TableHeaderColumn isKey dataField='id_filial' dataAlign='center'>№</TableHeaderColumn>
                <TableHeaderColumn dataField='address' dataAlign='center'>Адрес банковского филиала</TableHeaderColumn>
                <TableHeaderColumn dataField='phone_number' dataAlign='center'>Контактный номер телефона</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}

export default Filial;