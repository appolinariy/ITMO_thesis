import React, { Component } from "react";
import "../tableBlock.css";
import Table from "../../Table/Table";
import {
  getContracts,
  createContract,
  findContract,
  filterContract
} from "../../../libs/effects";

class Contract extends Component {
  state = {
    contracts: [],
    percent_year: [
      { id: 1, text: "8.0" },
      { id: 2, text: "8.5" },
      { id: 3, text: "9.0" },
      { id: 4, text: "9.9" }
    ],
    thForTable: ["flag_payment"],
    keyCol: "number_contract"
  };

  componentDidMount() {
    getContracts().then(response => {
      const borrowers = [];
      response.borrowers.forEach(borrower =>
        borrowers.push({
          id: borrower.id_client,
          text:
            borrower.surname + " " + borrower.name + " " + borrower.father_name
        })
      );
      response.data.map(element => {
        element.fio =
          element.surname + " " + element.name + " " + element.father_name;
        element.start_date = new Date(element.start_date)
          .toLocaleDateString()
          .split("/")
          .join(".");
        if (element.flag_payment) {
          element.flag_payment = "Завершен";
        } else {
          element.flag_payment = "Активен";
        }
        return element;
      });
      this.setState({ contracts: response.data, borrowers: borrowers });
    });
  }

  onAddRow = row => {
    console.log("Contract", row);
    createContract(row).then(res => {
      row.id_contract = res.id_contract;
    });
    this.setState({
      contracts: [...this.state.contracts, row]
    });
  };

  onFind = data => {
    findContract(data).then(response => {
      response.data.map(element => {
        element.fio =
          element.surname + " " + element.name + " " + element.father_name;
        element.start_date = new Date(element.start_date)
          .toLocaleDateString()
          .split("/")
          .join(".");
        if (element.flag_payment) {
          element.flag_payment = "Завершен";
        } else {
          element.flag_payment = "Активен";
        }
        return element;
      });
      this.setState({ contracts: response.data });
    });
  };

  onFilterDate = (fromdate, todate) => {
    if (fromdate && todate) {
      filterContract(
        new Date(fromdate)
          .toLocaleDateString()
          .split("/")
          .join("."),
        new Date(todate)
          .toLocaleDateString()
          .split("/")
          .join(".")
      ).then(response => {
        response.data.map(element => {
          element.fio =
            element.surname + " " + element.name + " " + element.father_name;
          element.start_date = new Date(element.start_date)
            .toLocaleDateString()
            .split("/")
            .join(".");
          if (element.flag_payment) {
            element.flag_payment = "Завершен";
          } else {
            element.flag_payment = "Активен";
          }
          return element;
        });
        this.setState({ contracts: response.data });
      });
    } else {
      this.componentDidMount();
    }
  };

  render() {
    let header = [
      {
        key: "number_contract",
        name: "Номер контракта",
        type: "text",
        pattern: /\d{6,}/,
        placeholder: "346790"
      },
      {
        key: "fio",
        name: "Заемщик",
        type: "select",
        options: this.state.borrowers,
        pattern: ""
      },
      {
        key: "start_date",
        name: "Дата заключения",
        type: "date",
        pattern: ""
      },
      {
        key: "term_contract",
        name: "Срок (мес.)",
        type: "text",
        pattern: /\d{1,2}/,
        placeholder: "Кол-во месяцев: 3-96"
      },
      {
        key: "amount_contract",
        name: "Сумма контракта (руб.)",
        type: "text",
        pattern: /\d+(\.\d{2})?/,
        placeholder: "500000.00"
      },
      {
        key: "year_percent",
        name: "Процентная ставка (%)",
        type: "select",
        options: this.state.percent_year,
        pattern: ""
      },
      {
        key: "flag_payment",
        name: "Статус контракта",
        type: "text",
        pattern: ""
      }
    ];
    return (
      <Table
        className={"contracts"}
        classNameForm={"tableBlock"}
        onAdd={this.onAddRow}
        onFind={this.onFind}
        onFilterDate={this.onFilterDate}
        header={header}
        data={this.state.contracts}
        keyCol={this.state.keyCol}
        header_display
        findCol="number_contract"
        hideRows={this.state.hideRows}
        thForTable={this.state.thForTable}
        alert_name="данных по контракту"
        module_name="Контракты"
      />
    );
  }
}

export default Contract;
