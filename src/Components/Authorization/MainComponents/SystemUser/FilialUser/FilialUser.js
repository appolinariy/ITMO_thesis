import React, { Component } from 'react';
import {BootstrapTable, 
    TableHeaderColumn} from 'react-bootstrap-table';
import './FilialUser.css';
import { getBankUserFromFilial as printBankUserFromFilial } from '../../../../../libs/effects';

class UsersFilial extends Component {
    state = {
        userfilial: []
    }

    componentDidMount() {
        printBankUserFromFilial('alexey_gum').then(response => {
            console.log(response)
            this.setState({userfilial: response})
        });
    }

    render() {
        return (
            <div className='userfilial'>
                <div className='systemusers'>Пользователи в системе</div>
                <BootstrapTable className='user_filial' data={this.state.userfilial}>
                    <TableHeaderColumn dataField='surname' dataAlign='center'>Фамилия</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataAlign='center'>Имя</TableHeaderColumn>
                    <TableHeaderColumn dataField='father_name' dataAlign='center'>Отчество</TableHeaderColumn>
                    <TableHeaderColumn dataField='position' dataAlign='center'>Должность</TableHeaderColumn>
                    <TableHeaderColumn isKey dataField='login' dataAlign='center'>Логин</TableHeaderColumn>
                    <TableHeaderColumn dataField='system_role' dataAlign='center'>Роль в системе</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default UsersFilial;