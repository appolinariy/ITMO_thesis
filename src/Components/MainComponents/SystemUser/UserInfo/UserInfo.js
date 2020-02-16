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
            response.forEach(user => user.fio = user.surname + ' ' + user.name + ' ' + user.father_name);
            this.setState({ userinfo: response });
        });
    }

    render() {
        return (
            <>
                {/* <div className='currentuser'>
                    <p>Текущий пользователь в системе</p>
                </div>
                <Table
                    className={'system_user'}
                    header={this.state.header}
                    data={this.state.userinfo}
                    keyCol={this.state.keyCol}
                /> */}
            </>
        );
    }
}

export default withRouter(UserInfo);