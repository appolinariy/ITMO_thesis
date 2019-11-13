import React, { Component } from 'react';
import {BootstrapTable, 
    TableHeaderColumn} from 'react-bootstrap-table';
import './Filial.css';
import { getFilials as printFilials} from '../../../../libs/effects';


class Filial extends Component {
    render() {
        const data = printFilials();//Ошибка!
        return(
            <BootstrapTable data={data}>
                <TableHeaderColumn isKey dataField='id_filial' dataAlign='center'>№</TableHeaderColumn>
                <TableHeaderColumn dataField='address' dataAlign='center'>Адрес банковского филиала</TableHeaderColumn>
                <TableHeaderColumn dataField='phone_number' dataAlign='center'>Контактный номер телефона</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}

export default Filial;