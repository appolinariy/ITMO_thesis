import React, { Component } from 'react';
import './Borrower.css';
import { getAllClients } from '../../../libs/effects';

import Table from "../../Table/Table";

class Borrower extends Component {
    state = {
        clients: [],
        header: [
            // { key: 'id_client', name: '№' },
            { key: 'surname', name: 'Фамилия' },
            { key: 'name', name: 'Имя' },
            { key: 'father_name', name: 'Отчество' },
            { key: 'birthday', name: 'Дата рождения' },
            { key: 'mail', name: 'Адрес электронной почты' },
            { key: 'phone_number', name: 'Номер телефона' },
            { key: 'address', name: 'Адрес проживания' },
            { key: 'passport_number', name: 'Номер паспорта' },
            { key: 'exp_passport_date', name: 'Действителен до' },
            { key: 'passport_by', name: 'Кем выдан' },

        ],
        // hideRows: ['id_client'],
        keyCol: 'id_client'
    }

    componentDidMount() {
        getAllClients().then(response => {
            console.log(response)
            this.setState({ clients: response })
        });
    }

    onCellEdit = (row, fieldName, value) => {
        // const { userfilial } = this.state;
        // let rowIdx;
        // const targetRow = userfilial.find((prod, i) => {
        //   if (prod.id === row.id) {
        //     rowIdx = i;
        //     return true;
        //   }
        //   return false;
        // });
        // if (targetRow) {
        //   targetRow[fieldName] = value;
        //   userfilial[rowIdx] = targetRow;
        //   this.setState({ userfilial });
        // }
    };

    onAddRow = row => {
        // createBankUser(row).then((res) => {
        //   row.id_user = res.id_user;
        // })
        // this.setState({
        //   userfilial: [...this.state.userfilial, row]
        // });
    };

    onDeleteRow = row => {
        //   console.log(`Удаление: ${row.id_user}`);
        //   deleteBankUser(row.id_user).then((res) => {
        //     let newData = this.state.userfilial;
        //     newData = newData.filter(element => {
        //       return element.id_user !== row.id_user;
        //     });
        //     this.setState({
        //         userfilial: newData
        //     })
        //   })        
    }

    onUpdateRow = row => {
        // updateBankUser(row, row.id_user).then(res => {
        //   let newData = this.state.userfilial;
        //   let index = this.state.userfilial.indexOf(newData.find(el => el[this.state.keyCol] === row[this.state.keyCol]));
        //   newData[index] = row;
        //   this.setState({
        //     userfilial: newData
        //   })
        // })
    }

    onFind = data => {
        this.setState({ clients: data })
    }

    render() {
        return (
            <Table
                classNameForm={'clients'}
                classNameFind={'findBlock'}
                onAdd={this.onAddRow}
                onDelete={this.onDeleteRow}
                onUpdate={this.onUpdateRow}
                onFind={this.onFind}
                header={this.state.header}
                data={this.state.clients}
                keyCol={this.state.keyCol}
                control_input
                header_display
                findCol='surname'
                hideRows={this.state.hideRows}
            />
        );
    }
}

export default Borrower;