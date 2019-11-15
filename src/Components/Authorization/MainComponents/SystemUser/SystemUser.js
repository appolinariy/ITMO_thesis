import React, { Component } from 'react';
import {BootstrapTable, 
    TableHeaderColumn} from 'react-bootstrap-table';
import './SystemUser.css';
import { getBankUserById as printBankUserInfo } from '../../../../libs/effects';


class SystemUser extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        printBankUserInfo(1).then(response => {
            console.log(response)
            this.setState({data: response})
        });
    }

    render() {
        return (
            <div className='userinfo'>
                <div className='currentuser'>Текущий пользователь в системе</div>
                <BootstrapTable className='system_user' data={this.state.data}>
                    <TableHeaderColumn dataField='surname' dataAlign='center'>Фамилия</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataAlign='center'>Имя</TableHeaderColumn>
                    <TableHeaderColumn dataField='father_name' dataAlign='center'>Отчество</TableHeaderColumn>
                    <TableHeaderColumn dataField='position' dataAlign='center'>Должность</TableHeaderColumn>
                    <TableHeaderColumn dataField='address' dataAlign='center'>Адрес банковского филиала</TableHeaderColumn>
                    <TableHeaderColumn isKey dataField='login' dataAlign='center'>Логин</TableHeaderColumn>
                </BootstrapTable>
            </div>
            
        );
    }
}

export default SystemUser;