import React, { Component } from "react";
import "./Borrower.css";
import {
  getAllClients,
  createClient,
  updateClient,
  deleteClient,
  findClient
} from "../../../libs/effects";

import Table from "../../Table/Table";

class Borrower extends Component {
  state = {
    clients: [],
    header: [
      {
        key: "surname",
        name: "Фамилия",
        type: "text",
        pattern: /[А-Я][а-я]*/,
        placeholder: "Иванов"
      },
      {
        key: "name",
        name: "Имя",
        type: "text",
        pattern: /[А-Я][а-я]*/,
        placeholder: "Иван"
      },
      {
        key: "father_name",
        name: "Отчество",
        type: "text",
        pattern: /[А-Я][а-я]*/,
        placeholder: "Иванович"
      },
      { key: "fio", name: "ФИО" },
      {
        key: "birthday",
        name: "Дата рождения",
        type: "date",
        pattern: ""
      },
      {
        key: "mail",
        name: "Адрес электронной почты",
        type: "email",
        pattern: "",
        placeholder: "name@mail.ru"
      },
      {
        key: "phone_number",
        name: "Номер телефона",
        type: "text",
        pattern: /^\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
        placeholder: "+7 (xxx) xxx-xx-xx"
      },
      {
        key: "address",
        name: "Адрес проживания",
        type: "text",
        pattern: "",
        placeholder: "г. Москва, Ленинский пр.22/1, кв.1"
      },
      {
        key: "passport_number",
        name: "Номер паспорта",
        type: "text",
        pattern: /\d{4} \d{6}/,
        placeholder: "4014 213528"
      },
      {
        key: "exp_passport_date",
        name: "Действителен до",
        type: "date",
        pattern: ""
      },
      {
        key: "passport_by",
        name: "Кем выдан",
        type: "text",
        pattern: "",
        placeholder: "240-003, ГУ МВД России по Лен.Области, 2018"
      }
    ],
    hideRows: ["surname", "name", "father_name"],
    thForTable: ["fio"],
    keyCol: "surname"
  };

  componentDidMount() {
    getAllClients().then(response => {
      response.map(borrower => {
        borrower.fio =
          borrower.surname + " " + borrower.name + " " + borrower.father_name;
        borrower.birthday = new Date(borrower.birthday)
          .toLocaleDateString()
          .split("/")
          .join(".");
        borrower.exp_passport_date = new Date(borrower.exp_passport_date)
          .toLocaleDateString()
          .split("/")
          .join(".");
        return borrower;
      });
      this.setState({ clients: response });
    });
  }

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

  onAddRow = row => {
    createClient(row).then(res => {
      row.id_client = res.id_client;
    });
    this.setState({
      clients: [...this.state.clients, row]
    });
  };

  onDeleteRow = row => {
    console.log(`Удаление: ${row.id_client}`);
    deleteClient(row.id_client).then(() => {
      let newData = this.state.clients;
      newData = newData.filter(element => {
        return element.id_client !== row.id_client;
      });
      this.setState({
        clients: newData
      });
    });
  };

  onUpdateRow = row => {
    updateClient(row, row.id_client).then(() => {
      let newData = this.state.clients;
      let index = this.state.clients.indexOf(
        newData.find(el => el[this.state.keyCol] === row[this.state.keyCol])
      );
      newData[index] = row;
      this.setState({
        clients: newData
      });
    });
  };

  onFind = data => {
    findClient(data).then(response => {
      response.data.forEach(borrower => {
        borrower.fio =
          borrower.surname + " " + borrower.name + " " + borrower.father_name;
        borrower.birthday = new Date(borrower.birthday)
          .toLocaleDateString()
          .split("/")
          .join(".");
        borrower.exp_passport_date = new Date(borrower.exp_passport_date)
          .toLocaleDateString()
          .split("/")
          .join(".");
        return borrower;
      });
      this.setState({ clients: response.data });
    });
  };

  render() {
    return (
      <Table
        className={"borrower"}
        classNameForm={"clients"}
        onAdd={this.onAddRow}
        onDelete={this.onDeleteRow}
        onUpdate={this.onUpdateRow}
        onFind={this.onFind}
        header={this.state.header}
        data={this.state.clients}
        keyCol={this.state.keyCol}
        control_input
        header_display
        findCol="surname"
        styles={{ width: "33%", marginTop: "4%" }}
        thForTable={this.state.thForTable}
        hideRows={this.state.hideRows}
        alert_name="данных о заемщике"
      />
    );
  }
}

export default Borrower;
