import React, { Component } from 'react';
import './UserInfo.css';
import { getBankUserById } from '../../../../libs/effects';

import Table from "../../../Table/Table";

class UserInfo extends Component {
    state = {
        userinfo: [],
        header: [
            {key: 'surname', name: 'Фамилия'},
            {key: 'name', name: 'Имя'},
            {key: 'father_name', name: 'Отчество'},
            {key: 'position', name: 'Должность'},
            {key: 'address', name: 'Адрес филиала'},
            {key: 'login', name: 'Логин'},            
        ],
        keyCol: 'login'
    }

    componentDidMount() {
        getBankUserById('julia_romanova').then(response => {
            console.log(response)
            this.setState({userinfo: response})
        });
    }

    render() {
        return (
            <>
                <div className='currentuser'>Текущий пользователь в системе</div>
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

export default UserInfo;