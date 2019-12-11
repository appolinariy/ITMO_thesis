import React, { Component } from 'react';
import './Borrower.css';
import { getAllClients, createClient, updateClient, deleteClient } from '../../../libs/effects';

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

    //спросить у Сережи
    onCellEdit = (row, fieldName, value) => {
        const { clients } = this.state;
        let rowIdx;
        const targetRow = clients.find((prod, i) => {
            if (prod.id === row.id) {
                rowIdx = i;
                return true;
            }
            return false;
        });
        if (targetRow) {
            targetRow[fieldName] = value;
            clients[rowIdx] = targetRow;
            this.setState({ clients });
        }
    };

    //спросить у Сережи
    onAddRow = row => {
        createClient(row).then((res) => {
            row.id_client = res.id_client;
        })
        this.setState({
            clients: [...this.state.clients, row]
        });
    };

    //спросить у Сережи
    onDeleteRow = row => {
        console.log(`Удаление: ${row.id_client}`);
        deleteClient(row.id_client).then((res) => {
            let newData = this.state.clients;
            newData = newData.filter(element => {
                return element.id_client !== row.id_client;
            });
            this.setState({
                clients: newData
            })
        })
    }

    //спросить у Сережи
    onUpdateRow = row => {
        updateClient(row, row.id_client).then(res => {
            let newData = this.state.clients;
            let index = this.state.clients.indexOf(newData.find(el => el[this.state.keyCol] === row[this.state.keyCol]));
            newData[index] = row;
            this.setState({
                clients: newData
            })
        })
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
            // hideRows={this.state.hideRows}
            />
        );
    }
}

export default Borrower;