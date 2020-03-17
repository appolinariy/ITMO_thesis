import React, { Component } from "react";
import "./contract.css";
import Table from "../../Table/Table";
import {
  getContracts,
  createContract,
  findContract
} from "../../../libs/effects";

class Contract extends Component {
  state = {
    contracts: [],
    hideRows: ["surname", "name", "father_name"],
    thForTable: ["fio"],
    keyCol: "number_contract",
    header: [
      {
        key: "number_contract",
        name: "Номер контракта"
      },
      {
        key: "fio",
        name: "Заемщик"
      },
      {
        key: "start_date",
        name: "Дата заключения"
      },
      {
        key: "term_contract",
        name: "Срок (мес.)"
      },
      {
        key: "amount_contract",
        name: "Сумма контракта (руб.)"
      },
      {
        key: "year_percent",
        name: "Процентная ставка (%)"
      },
      {
        key: "status_contract",
        name: "Статус контракта"
      }
    ]
  };

  componentDidMount() {
    getContracts().then(response => {
      response.data.map(element => {
        element.fio =
          element.surname + " " + element.name + " " + element.father_name;
        element.start_date = new Date(element.start_date)
          .toLocaleDateString()
          .split("/")
          .join(".");
        element.end_date = new Date(element.start_date)
          .toLocaleDateString()
          .split("/")
          .join(".");
        if (element.flag_payment) {
          element.status_contract = "Завершен";
        } else {
          element.status_contract = "Активен";
        }
        return element;
      });
      this.setState({ contracts: response.data });
    });
  }

  onCellEdit = (row, fieldName, value) => {
    const { contracts } = this.state;
    let rowIdx;
    const targetRow = contracts.find((prod, i) => {
      if (prod.id === row.id) {
        rowIdx = i;
        return true;
      }
      return false;
    });
    if (targetRow) {
      targetRow[fieldName] = value;
      contracts[rowIdx] = targetRow;
      this.setState({ contracts });
    }
  };

  onAddRow = () => {
    // createContract(row).then(res => {
    //   row.id_contract = res.id_contract;
    // });
    // this.setState({
    //   clients: [...this.state.contracts, row]
    // });
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
        element.end_date = new Date(element.start_date)
          .toLocaleDateString()
          .split("/")
          .join(".");
        if (element.flag_payment) {
          element.status_contract = "Завершен";
        } else {
          element.status_contract = "Активен";
        }
        return element;
      });
      this.setState({ contracts: response.data });
    });
  };

  render() {
    return (
      <Table
        className={"filialUser"}
        classNameForm={"userfilial"}
        onAdd={this.onAddRow}
        onFind={this.onFind}
        header={this.state.header}
        data={this.state.contracts}
        keyCol={this.state.keyCol}
        control_input
        header_display
        findCol="number_contract"
        hideRows={this.state.hideRows}
        thForTable={this.state.thForTable}
        alert_name="данных по контракту"
      />
    );
  }
}

export default Contract;
