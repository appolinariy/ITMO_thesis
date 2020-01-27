import React, { Component } from 'react';
import './FilialUser.css';
import { getAllBankUser as printAllBankUser, createBankUser, updateBankUser, findBankUser } from '../../../../libs/effects';

import Table from "../../../Table/Table";

class UsersFilial extends Component {
  state = {
    userfilial: [],
    hideRows: ['password'],
    keyCol: 'login'
  }

  componentDidMount() {
    printAllBankUser().then(response => {
      const filials = []
      response.filials.forEach(filial => filials.push({ id: filial.id_filial, text: filial.address }))
      this.setState({ userfilial: response.data, filials: filials })
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

  onUpdateRow = row => {
    updateBankUser(row, row.id_user).then(() => {
      let newData = this.state.userfilial;
      let index = this.state.userfilial.indexOf(newData.find(el => el[this.state.keyCol] === row[this.state.keyCol]));
      newData[index] = row;
      this.setState({
        userfilial: newData
      })
    })
  }

  onFind = data => {
    findBankUser(data).then(response => {
      const filials = []
      response.filials.forEach(filial => filials.push({ id: filial.id_filial, text: filial.address }))
      this.setState({ userfilial: response.data, filials: filials })
    })
  }

  render() {
    let header = [
      { key: 'surname', name: 'Фамилия' },
      { key: 'name', name: 'Имя' },
      { key: 'father_name', name: 'Отчество' },
      { key: 'position', name: 'Должность' },
      { key: 'login', name: 'Логин' },
      { key: 'password', name: 'Пароль' },
      { key: 'address', name: 'Филиал', type: 'select', options: this.state.filials },
      { key: 'system_role', name: 'Роль в системе' },
    ];
    return (
      <Table
        classNameForm={'userfilial'}
        classNameFind={'findBlock'}
        onAdd={this.onAddRow}
        onUpdate={this.onUpdateRow}
        onFind={this.onFind}
        header={header}
        data={this.state.userfilial}
        keyCol={this.state.keyCol}
        control_input
        header_display
        findCol='surname'
        hideRows={this.state.hideRows}
        alert_name='данных о пользователе'
      />
    );
  }

}

export default UsersFilial;