import React, { Component } from 'react';
import './SystemUser.css';
import UserInfo from './UserInfo/UserInfo';
import UsersFilial from './FilialUser/FilialUser';


class SystemUser extends Component {
    state = {
        role_user: 'Администратор'// в состояние класть новую роль из бд и рендерить таблицу пользователей в зависимости от него
    }

    render() {
        const isAdmin = this.state.role_user;
        let tableForAdmin;

        if(isAdmin == 'Администратор'){
            tableForAdmin = <UsersFilial/>
        }
        return (
           <main>
               {/* <UserInfo /> */}
               {tableForAdmin}
           </main>
        );
    }
}

export default SystemUser;