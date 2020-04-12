import React, { Component } from "react";
import TablePayments from "../../Table/TablePayments/TablePayments";
import "./payment.css";
import {
  getContracts,
  findContract,
  getPaymentSchedule
} from "../../../libs/effects";
import { addPaymentDebt } from "../../../libs/effects";

// export const Payment = () => {
//   const handleClick = () => {
//     addPaymentDebt("346790", "10.06.2020", 93000.0);
//   };
//   return <button onClick={handleClick}>Payment</button>;
// };

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
    if (row.type_pay === "Основной долг") {
      console.log("1", row.type_pay);
      addPaymentDebt(
        row.number_contract,
        row.current_date_pay,
        row.current_amount_pay
      );
    } else {
      console.log("2", row.type_pay);
    }
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
          }
          if (element.fact_date_penya != null) {
            element.fact_date_penya = this.toNormalDate(
              element.fact_date_penya
            );
          }
          return element;
        });
        this.setState({ graphic_payments: response.data });
      });
    }
  };

  // onFilterPayment = () => {};

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
        pattern: /\d+(\.\d{1})?/,
        placeholder: "500000.0"
      }
    ];
    let headerTable = [
      {
        key: "plan_date_pay",
        name: "Плановая дата выплаты по кредиту",
        type: "",
        pattern: ""
      },
      {
        key: "plan_amount_pay",
        name: "Плановая сумма выплаты по кредиту (руб.)",
        type: "",
        pattern: ""
      },
      {
        key: "fact_date_pay",
        name: "Фактическая дата выплаты",
        type: "date",
        pattern: ""
      },
      {
        key: "fact_amount_pay",
        name: "Фактическая сумма выплаты (руб.)",
        type: "",
        pattern: ""
      },
      {
        key: "debt_month_pay",
        name: "Задолженность за месяц",
        type: "",
        pattern: ""
      },
      {
        key: "debt_penya",
        name: "Долг по пени",
        type: "",
        pattern: ""
      },
      {
        key: "fact_date_penya",
        name: "Фактическая дата выплаты",
        type: "date",
        pattern: ""
      },
      {
        key: "fact_amount_penya",
        name: "Фактическая сумма выплаты (руб.)",
        type: "",
        pattern: ""
      }
    ];
    return (
      <>
        <TablePayments
          // className={"filialUser"}
          classNameForm={"formPayment"}
          onAdd={this.onAddRow}
          onFind={this.onFind}
          handleList={this.handleList}
          // onFilterPayment={this.onFilterPayment}
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
        />
      </>
    );
  }
}
export default Payment;
