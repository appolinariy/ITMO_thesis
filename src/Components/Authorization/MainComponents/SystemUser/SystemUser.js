import React, { Component } from 'react';
import './SystemUser.css';
import UserInfo from './UserInfo/UserInfo';
import UsersFilial from './FilialUser/FilialUser';


class SystemUser extends Component {
    render() {
        return (
           <main>
               <UserInfo />
               <UsersFilial/>
           </main>
        );
    }
}

export default SystemUser;