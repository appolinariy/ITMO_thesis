import React, { Component } from "react";
import TablePayments from "../../Table/TablePayments/TablePayments";
import "./payment.css";
import {
  getContracts,
  findContract,
  getPaymentSchedule,
  countDebts,
  addPaymentDebt,
  addPaymentPenya,
  filterGraphs
} from "../../../libs/effects";

class Payment extends Component {
  state = {
    contracts: [],
    contractsAlert: [],
    graphic_payments: [],
    type_payment: [
      { id: 0, text: "Основной долг" },
      { id: 1, text: "Долг по пени" }
    ],
    thForTable: ["number_contract_fio"],
    ListHideRows: [
      "type_payment",
      "number_contract",
      "current_date_pay",
      "current_amount_pay"
    ],
    keyCol: "number_contract"
  };

  componentDidMount = () => {
    const arr_number_contract = [];
    getContracts().then(response => {
      response.data.map(element => {
        element.number_contract_fio =
          element.number_contract +
          " / " +
          element.surname +
          " " +
          element.name[0] +
          "." +
          element.father_name[0] +
          ".";
        arr_number_contract.push({
          id: element.id_contract,
          text: element.number_contract
        });
        return element;
      });
      this.setState({
        contracts: response.data,
        number_contract: arr_number_contract
      });
    });
  };

  onAddRow = row => {
    if (!row.type_pay || row.type_pay === "Основной долг") {
      addPaymentDebt(
        row.number_contract,
        row.current_date_pay,
        row.current_amount_pay
      );
    } else {
      console.log("2", row.type_pay);
      addPaymentPenya(
        row.number_contract,
        row.current_date_pay,
        row.current_amount_pay
      );
    }
  };

  onCountDebts = () => {
    countDebts();
  };

  onFind = data => {
    findContract(data).then(response => {
      response.data.map(element => {
        element.number_contract_fio =
          element.number_contract +
          " / " +
          element.surname +
          " " +
          element.name[0] +
          "." +
          element.father_name[0] +
          ".";
        return element;
      });
      this.setState({ contracts: response.data });
    });
  };

  toNormalDate = date => {
    date = new Date(date)
      .toLocaleDateString()
      .split("/")
      .join(".");
    return date;
  };

  handleList = number_contract => {
    if (number_contract.length) {
      getPaymentSchedule(number_contract).then(response => {
        response.data.map(element => {
          if (element.plan_date_pay != null) {
            element.plan_date_pay = this.toNormalDate(element.plan_date_pay);
          }
          if (element.fact_date_pay != null) {
            element.fact_date_pay = this.toNormalDate(element.fact_date_pay);
          } else {
            element.fact_date_pay = "-";
          }
          if (element.fact_date_penya != null) {
            element.fact_date_penya = this.toNormalDate(
              element.fact_date_penya
            );
          } else {
            element.fact_date_penya = "-";
          }
          return element;
        });
        this.setState({ graphic_payments: response.data });
      });
    }
  };

  onFilterPayment = type => {
    let arr_number_contract = [];
    filterGraphs().then(response => {
      const { expContracts, okContracts, rows_contracts } = response;
      switch (type) {
        case "all":
          rows_contracts.map(el => {
            el.number_contract_fio =
              el.number_contract +
              " / " +
              el.surname +
              " " +
              el.name[0] +
              "." +
              el.father_name[0] +
              ".";
            arr_number_contract.push({
              id: el.id_contract,
              text: el.number_contract
            });
            return el;
          });
          this.setState({
            contracts: rows_contracts,
            number_contract: arr_number_contract
          });
          break;
        case "exp":
          expContracts.map(el => {
            el.number_contract_fio =
              el.number_contract +
              " / " +
              el.surname +
              " " +
              el.name[0] +
              "." +
              el.father_name[0] +
              ".";
            arr_number_contract.push({
              id: el.id_contract,
              text: el.number_contract
            });
            return el;
          });
          this.setState({
            contracts: expContracts,
            number_contract: arr_number_contract
          });
          break;
        case "ok":
          okContracts.map(el => {
            el.number_contract_fio =
              el.number_contract +
              " / " +
              el.surname +
              " " +
              el.name[0] +
              "." +
              el.father_name[0] +
              ".";
            arr_number_contract.push({
              id: el.id_contract,
              text: el.number_contract
            });
            return el;
          });
          this.setState({
            contracts: okContracts,
            number_contract: arr_number_contract
          });
          break;
        default:
          break;
      }
    });
  };

  render() {
    let headerList = [
      {
        key: "number_contract_fio",
        name: "Номер контракта / ФИО",
        type: "select",
        options: this.state.number_contract,
        pattern: ""
      },
      {
        key: "type_payment",
        name: "Вид погашения",
        type: "radio",
        radio: this.state.type_payment,
        pattern: ""
      },
      {
        key: "number_contract",
        name: "Номер контракта",
        type: "select",
        options: this.state.number_contract,
        pattern: ""
      },
      {
        key: "current_date_pay",
        name: "Дата выплаты",
        type: "date",
        pattern: ""
      },
      {
        key: "current_amount_pay",
        name: "Сумма выплаты (руб.)",
        type: "text",
        pattern: /\d+(\.\d{2})?/,
        placeholder: "500000.00"
      }
    ];
    let headerTable = [
      {
        key: "plan_date_pay",
        name: "Плановая дата выплаты",
        type: "",
        pattern: ""
      },
      {
        key: "plan_amount_pay",
        name: "Плановая сумма выплаты (руб.)",
        type: "",
        pattern: ""
      },
      {
        key: "fact_date_pay",
        name: "Дата выплаты",
        type: "date",
        pattern: ""
      },
      {
        key: "fact_amount_pay",
        name: "Сумма выплаты (руб.)",
        type: "",
        pattern: ""
      },
      {
        key: "debt_month_pay",
        name: "Долг за месяц (руб.)",
        type: "",
        pattern: ""
      },
      {
        key: "debt_penya",
        name: "Пеня (руб.)",
        type: "",
        pattern: ""
      },
      {
        key: "fact_date_penya",
        name: "Дата выплаты",
        type: "date",
        pattern: ""
      },
      {
        key: "fact_amount_penya",
        name: "Сумма выплаты (руб.)",
        type: "",
        pattern: ""
      },
      {
        key: "debt_month_penya",
        name: "Долг за месяц (руб.)",
        type: "",
        pattern: ""
      }
    ];
    return (
      <TablePayments
        classNameForm={"formPayment"}
        onAdd={this.onAddRow}
        onCountDebts={this.onCountDebts}
        onFind={this.onFind}
        handleList={this.handleList}
        onFilterPayment={this.onFilterPayment}
        headerList={headerList}
        header={headerTable}
        list={this.state.contracts}
        data={this.state.graphic_payments}
        keyCol={this.state.keyCol}
        header_display
        findCol="number_contract"
        ListHideRows={this.state.ListHideRows}
        thForTable={this.state.thForTable}
        alert_name="платежа"
        module_name="Выплаты"
      />
    );
  }
}
export default Payment;
