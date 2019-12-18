import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import './UserInfo.css';
import { getBankUserById } from '../../../../libs/effects';

import Table from "../../../Table/Table";

class UserInfo extends Component {
    state = {
        userinfo: [],
        header: [
            { key: 'surname', name: 'Фамилия' },
            { key: 'name', name: 'Имя' },
            { key: 'father_name', name: 'Отчество' },
            { key: 'position', name: 'Должность' },
            { key: 'address', name: 'Адрес филиала' },
            { key: 'login', name: 'Логин' },
        ],
        keyCol: 'login'
    }

    componentDidMount() {
        getBankUserById(this.props.id_user).then(response => {
            console.log(response)
            this.setState({ userinfo: response })
        });
    }

    logout = () => {
        sessionStorage.removeItem('user');
        this.props.history.push("/auth");
    }


    render() {
        return (
            <>
                <div className='currentuser'>
                    <p>Текущий пользователь в системе</p>
                    <input className='logout' type='button' value='Выйти' onClick={this.logout} />
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