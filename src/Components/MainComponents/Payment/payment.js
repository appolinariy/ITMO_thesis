import React, { Component } from "react";
import TablePayments from "../../Table/TablePayments/TablePayments";
import "./payment.css";
import { getContracts, findContract } from "../../../libs/effects";
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
    thForTable: ["number_contract_fio"],
    ListHideRows: ["number_contract"],
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

  onAddRow = () => {};

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
        key: "number_contract",
        name: "Номер контракта",
        type: "select",
        options: this.state.number_contract,
        pattern: ""
      }
    ];
    let headerTable = [
      {
        key: "number_contract",
        name: "Графа таблицы",
        type: "text",
        pattern: /{0-9}{6,}/,
        placeholder: "346790"
      }
    ];
    return (
      <>
        <TablePayments
          className={"filialUser"}
          classNameForm={"formPayment"}
          onAdd={this.onAddRow}
          onFind={this.onFind}
          // onFilterPayment={this.onFilterPayment}
          headerList={headerList}
          header={headerTable}
          list={this.state.contracts}
          data={this.state.graphic_payments}
          keyCol={this.state.keyCol}
          control_input_list
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
