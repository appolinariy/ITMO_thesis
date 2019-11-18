import React, { Component } from 'react';
import './FilialUser.css';
import { getBankUserFromFilial as printBankUserFromFilial } from '../../../../../libs/effects';

import Table from "../../../../Table/Table";

class UsersFilial extends Component {
    state = {
        userfilial: [
            {surname: 'Абрамова', name: 'Полина', father_name: 'Глебовна', position: 'Заместитель отдела', login: 'polinkin', system_role: 'Администратор' },
            {surname: 'Синицин', name: 'Александр', father_name: 'Сергеевич', position: 'вавпкыа', login: 'alex', system_role: 'Юрист' },
            {surname: 'Кузнецов', name: 'Малина', father_name: 'Глебовна', position: 'Зцуцпкп', login: 'malina', system_role: 'Экономист' }
        ],
        header: [
            {key: 'surname', name: 'Фамилия'},
            {key: 'name', name: 'Имя'},
            {key: 'father_name', name: 'Отчество'},
            {key: 'position', name: 'Должность'},
            {key: 'login', name: 'Логин'},
            {key: 'system_role', name: 'Роль в системе'},
            
        ],
        keyCol: 'login'
    }

    // componentDidMount() {
    //     printBankUserFromFilial('alexey_gum').then(response => {
    //         console.log(response)
    //         this.setState({userfilial: response})
    //     });
    // }

    // onCellEdit = (row, fieldName, value) => {
    //     const { userfilial } = this.state;
    //     let rowIdx;
    //     const targetRow = userfilial.find((prod, i) => {
    //       if (prod.id === row.id) {
    //         rowIdx = i;
    //         return true;
    //       }
    //       return false;
    //     });
    //     if (targetRow) {
    //       targetRow[fieldName] = value;
    //       userfilial[rowIdx] = targetRow;
    //       this.setState({ userfilial });
    //     }
    // };
    
    onAddRow = row => {
        //1. Передаю с запросом в БД по параметрам (name, age).
        //2. Получаю ответ с переданного запроса в виде нового ID.
        //3. Запихнуть этот Id в newData.id.
        //4. И пушать newData в row.
        console.log(row)
        let newData = this.state.userfilial;
        newData.push(row);
        this.setState({
          userfilial: newData
        });
      };
    
      onDeleteRow = row => {
          console.log(row)
        let newData = this.state.userfilial;
        newData = newData.filter(element => {
          return element[this.state.keyCol] !== row[this.state.keyCol];
        });
        this.setState({
            userfilial: newData
        })
      }  

    render() {
        return (
        <Table
            onAdd={this.onAddRow}
            onDelete={this.onDeleteRow}
            header={this.state.header}
            data={this.state.userfilial}
            keyCol={this.state.keyCol}
          />
        );
    }

}

export default UsersFilial;