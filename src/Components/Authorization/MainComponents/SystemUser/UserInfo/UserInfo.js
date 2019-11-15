import React, { Component } from 'react';
import {BootstrapTable, 
    TableHeaderColumn} from 'react-bootstrap-table';
import './UserInfo.css';
import { getBankUserById as printBankUserInfo,} from '../../../../../libs/effects';

class UserInfo extends Component {
    state = {
        userinfo: []
    }

    componentDidMount() {
        printBankUserInfo('alexey_gum').then(response => {
            console.log(response)
            this.setState({userinfo: response})
        });
    }

    render() {
        return (
            <div className='userinfo'>
                <div className='currentuser'>Текущий пользователь в системе</div>
                <BootstrapTable className='system_user' data={this.state.userinfo}>
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

export default UserInfo;