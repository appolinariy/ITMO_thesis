import React, { Component } from 'react';
import {BootstrapTable, 
    TableHeaderColumn} from 'react-bootstrap-table';
import './Filial.css';


class Filial extends Component {
    render() {
        const data = [
            { address: 'ул. Королева 23', phone_number: '+7(921)787-54-76' },
            { address: 'пр. Комендантский 43', phone_number: '+7(921)787-54-76' },
            { address: 'ул. Савушкина 50', phone_number: '+7(921)787-54-76' },
            { address: 'ул. Савушкина 50', phone_number: '+7(921)787-54-76' },
            { address: 'ул. Савушкина 50', phone_number: '+7(921)787-54-76' },
        ];
        return(
            <BootstrapTable data={data}>
                <TableHeaderColumn isKey dataField='address' dataAlign='center' >Адрес банковского филиала</TableHeaderColumn>
                <TableHeaderColumn dataField='phone_number' dataAlign='center'>Контактный номер телефона</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}

export default Filial;