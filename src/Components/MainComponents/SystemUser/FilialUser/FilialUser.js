import React, { Component } from 'react';
import './FilialUser.css';
import { getAllBankUser as printAllBankUser, createBankUser, deleteBankUser, updateBankUser } from '../../../../libs/effects';

import Table from "../../../Table/Table";

class UsersFilial extends Component {
    state = {
        userfilial: [ ],
        header: [
            {key: 'surname', name: 'Фамилия'},
            {key: 'name', name: 'Имя'},
            {key: 'father_name', name: 'Отчество'},
            {key: 'position', name: 'Должность'},
            {key: 'login', name: 'Логин'},
            {key: 'password', name: 'Пароль'},
            {key: 'id_filial', name: 'Филиал'},
            {key: 'system_role', name: 'Роль в системе'},
            
        ],
        hideRows: ['password'],
        keyCol: 'login'
    }

    componentDidMount() {
        printAllBankUser().then(response => {
          console.log(response)
            this.setState({userfilial: response})
        });
    }

    onCellEdit = (row, fieldName, value) => {
        const { userfilial } = this.state;
        let rowIdx;
        const targetRow = userfilial.find((prod, i) => {
          if (prod.id === row.id) {
            rowIdx = i;
            return true;
          }
          return false;
        });
        if (targetRow) {
          targetRow[fieldName] = value;
          userfilial[rowIdx] = targetRow;
          this.setState({ userfilial });
        }
    };
    
    onAddRow = row => {
        createBankUser(row).then((res) => {
          row.id_user = res.id_user;
        })
        this.setState({
          userfilial: [...this.state.userfilial, row]
        });
      };
    
      onDeleteRow = row => {
        console.log(`Удаление: ${row.id_user}`);
        deleteBankUser(row.id_user).then((res) => {
          let newData = this.state.userfilial;
          newData = newData.filter(element => {
            return element.id_user !== row.id_user;
          });
          this.setState({
              userfilial: newData
          })
        })        
      }
      
      onUpdateRow = row => {
        updateBankUser(row, row.id_user).then(res => {
          let newData = this.state.userfilial;
          let index = this.state.userfilial.indexOf(newData.find(el => el[this.state.keyCol] === row[this.state.keyCol]));
          newData[index] = row;
          this.setState({
            userfilial: newData
          })
        })
        
      }

      onFind = data => {
        this.setState({userfilial: data})
      }

    render() {
        return (
        <Table
            className={'userfilial'}
            onAdd={this.onAddRow}
            onDelete={this.onDeleteRow}
            onUpdate={this.onUpdateRow}
            onFind={this.onFind}
            header={this.state.header}
            data={this.state.userfilial}
            keyCol={this.state.keyCol}
            control_input
            header_display
            findCol='surname'
            hideRows={this.state.hideRows}
          />
        );
    }

}

export default UsersFilial;