import React, { Component } from "react";
import "./contract.css";
import Table from "../../Table/Table";

class Contract extends Component {
  state = {
    contracts: [],
    hideRows: [],
    thForTable: []
  };

  componentDidMount() {}

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

  onAddRow = () => {};

  onDeleteRow = () => {};

  onUpdateRow = () => {};

  onFind = () => {};

  render() {
    let header = [{ key: "num_contract", name: "Номер контракта" }];
    return (
      <Table
        className={"filialUser"}
        classNameForm={"userfilial"}
        onAdd={this.onAddRow}
        onUpdate={this.onUpdateRow}
        onFind={this.onFind}
        header={header}
        data={this.state.contracts}
        keyCol={this.state.keyCol}
        control_input
        header_display
        // findCol="surname"
        hideRows={this.state.hideRows}
        thForTable={this.state.thForTable}
        alert_name="данные по контракту"
      />
    );
  }
}

export default Contract;
