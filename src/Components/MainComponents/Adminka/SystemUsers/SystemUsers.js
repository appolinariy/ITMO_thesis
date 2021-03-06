import React, { Component } from "react";
import "../../tableBlock.css";
import {
  getAllBankUser,
  createBankUser,
  updateBankUser,
  findBankUser
} from "../../../../libs/effects";
import Table from "../../../Table/Table";

class SystemUsers extends Component {
  state = {
    userfilial: [],
    hideRows: ["password", "surname", "name", "father_name"],
    thForTable: ["fio"],
    keyCol: "login",
    rule: [
      { id: 1, text: "Администратор" },
      { id: 2, text: "Экономист" },
      { id: 3, text: "Юрист" }
    ]
  };

  componentDidMount() {
    getAllBankUser().then(response => {
      const filials = [];
      response.filials.forEach(filial =>
        filials.push({ id: filial.id_filial, text: filial.address })
      );
      response.data.map(user => {
        user.fio = user.surname + " " + user.name + " " + user.father_name;
        return user;
      });
      this.setState({ userfilial: response.data, filials: filials });
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
    createBankUser(row).then(res => {
      row.id_user = res.id_user;
    });
    this.setState({
      userfilial: [...this.state.userfilial, row]
    });
  };

  onUpdateRow = row => {
    updateBankUser(row, row.id_user).then(() => {
      let newData = this.state.userfilial;
      let index = this.state.userfilial.indexOf(
        newData.find(el => el[this.state.keyCol] === row[this.state.keyCol])
      );
      newData[index] = row;
      this.setState({
        userfilial: newData
      });
    });
  };

  onFind = data => {
    findBankUser(data).then(response => {
      const filials = [];
      response.filials.forEach(filial =>
        filials.push({ id: filial.id_filial, text: filial.address })
      );
      response.data.map(user => {
        user.fio = user.surname + " " + user.name + " " + user.father_name;
        return user;
      });
      this.setState({ userfilial: response.data, filials: filials });
    });
  };

  render() {
    let header = [
      { key: "fio", name: "ФИО" },
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
      {
        key: "position",
        name: "Должность",
        type: "text",
        pattern: /^[А-Яа-яЁё\s]+$/,
        placeholder: "Старший экономист"
      },
      {
        key: "login",
        name: "Логин",
        type: "text",
        pattern: /^[a-zA-Z][a-zA-Z0-9-_.]{3,20}$/,
        placeholder: "ivan_1"
      },
      {
        key: "password",
        name: "Пароль",
        type: "password",
        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,20}$/,
        placeholder: "P@ssw0rd"
      },
      {
        key: "address",
        name: "Адрес филиала",
        type: "select",
        options: this.state.filials,
        pattern: ""
      },
      {
        key: "system_role",
        name: "Роль в системе",
        type: "select",
        options: this.state.rule,
        pattern: ""
      }
    ];
    return (
      <Table
        className={"filialUser"}
        classNameForm={"tableBlock"}
        onAdd={this.onAddRow}
        onUpdate={this.onUpdateRow}
        onFind={this.onFind}
        header={header}
        data={this.state.userfilial}
        keyCol={this.state.keyCol}
        control_input
        header_display
        findCol="surname"
        styles={{ marginTop: "6%", width: "30%", maxHeight: "73vh" }}
        hideRows={this.state.hideRows}
        thForTable={this.state.thForTable}
        alert_name="данных о пользователе"
        module_name="Администрирование"
      />
    );
  }
}

export default SystemUsers;
