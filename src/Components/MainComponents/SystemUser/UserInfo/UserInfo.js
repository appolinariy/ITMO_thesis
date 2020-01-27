import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import './UserInfo.css';
import { getBankUserById } from '../../../../libs/effects';

import Table from "../../../Table/Table";

class UserInfo extends Component {
    state = {
        userinfo: [],
        header: [
            { key: 'fio', name: 'ФИО' },
            { key: 'position', name: 'Должность' },
            { key: 'address', name: 'Адрес филиала' },
            { key: 'login', name: 'Логин' },
            { key: 'system_role', name: 'Роль в системе' },
        ],
        keyCol: 'login',
    }

    componentDidMount() {
        getBankUserById(this.props.id_user).then(response => {
            let response_copy = response;
            response_copy[0].fio = response[0].surname + " " + response[0].name + " " + response[0].father_name;
            this.setState({ userinfo: response_copy });
            // console.log('ФИО: ' + this.state.userinfo[0].surname, this.state.userinfo[0].name, this.state.userinfo[0].father_name);
        });
    }

    render() {
        return (
            <>
                <div className='currentuser'>
                    <p>Текущий пользователь в системе</p>
                </div>
                <Table
                    className={'system_user'}
                    header={this.state.header}
                    data={this.state.userinfo}
                    keyCol={this.state.keyCol}
                />
            </>
        );
    }
}

export default withRouter(UserInfo);