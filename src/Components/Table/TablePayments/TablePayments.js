import React from "react";
import "../Table.css";
import search_img from "../search.png";
import { Alert } from "./AlertPayments";

class TablePayments extends React.Component {
  state = {
    value: 0,
    data: {},
    open: false,
    rows: [],
    findVal: "",
    fromdate: "",
    todate: "",
    selected: ""
  };

  componentDidMount() {
    this.setState({ rows: this.props.data });
  }
  componentDidUpdate() {
    const item = this.props.list[0];
    if (item && !this.state.selected) {
      this.setState({ selected: item.number_contract });
      this.props.handleList(item.number_contract);
    }
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  inputChange = e => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });
  };

  handleAdd = e => {
    e.preventDefault();
    let newId = this.props.data[this.props.data.length - 1].id + 1;
    if (this.state.data[this.props.keyCol]) {
      this.props.onAdd({
        ...this.state.data,
        id: newId
      });
      this.setState({ data: {}, value: 0, show: false });
    }
  };

  findUserIndex = id => {
    let item = this.props.data.find(el => el[this.props.keyCol] === id);
    this.setState({ data: item });
  };

  findItem = e => {
    e.preventDefault();
    this.props.onFind(this.state.findVal);
  };

  cancelFinding = () => {
    this.setState({ findVal: "" });
    this.props.onFind("");
  };

  filterDate = e => {
    e.preventDefault();
    this.props.onFilterDate(this.state.fromdate, this.state.todate);
  };

  handleList = value => {
    this.props.handleList(value);
    this.setState({ selected: value });
  };

  render() {
    let headerList = this.props.headerList.map(
      col =>
        this.props.ListHideRows &&
        !this.props.ListHideRows.includes(col.key) && (
          <th key={col.key}>{col.name}</th>
        )
    );

    let contentList = this.props.list.map((el, index) => {
      let listdata = this.props.headerList.map(
        col =>
          this.props.ListHideRows &&
          !this.props.ListHideRows.includes(col.key) && (
            <td key={index + col.key}>{el[col.key]}</td>
          )
      );
      return (
        listdata && (
          <tr
            className={
              this.state.selected === el.number_contract
                ? "selected"
                : "unselected"
            }
            key={index}
            onClick={() => this.handleList(el.number_contract)}
          >
            {listdata}
            {this.props.control_input_list && (
              <td>
                <input
                  className="radio_btn"
                  type="radio"
                  name="id"
                  value={el[this.props.keyCol]}
                  onChange={this.handleChange}
                />
              </td>
            )}
          </tr>
        )
      );
    });

    let header = this.props.header.map(
      col =>
        this.props.hideRows &&
        !this.props.hideRows.includes(col.key) && (
          <th key={col.key}>{col.name}</th>
        )
    );

    let content = this.props.data.map((el, index) => {
      let data = this.props.header.map(
        col =>
          this.props.hideRows &&
          !this.props.hideRows.includes(col.key) && (
            <td key={index + col.key}>{el[col.key]}</td>
          )
      );

      return (
        data && (
          <tr className="trMain" key={index}>
            {data}
          </tr>
        )
      );
    });

    let newHeader = this.props.headerList.filter(el => {
      let flag = true;
      this.props.thForTable &&
        this.props.thForTable.forEach(th => {
          if (el.key === th) {
            flag = false;
          }
        });
      return flag;
    });

    return (
      <div className="table_container">
        {this.state.show && (
          <Alert
            header={newHeader}
            onClose={() => this.setState({ show: false })}
            data={this.state.data}
            title={this.props.alert_name}
            onChange={this.inputChange}
            handleAdd={this.handleAdd}
            styles={this.props.styles}
          />
        )}
        {this.props.header_display && (
          <header className="table_header">
            <div className="button_container">
              {/* {this.props.onFilterDate && (
                <form className="filterDate" onSubmit={this.filterDate}>
                  <input
                    type="date"
                    name="fromdate"
                    value={this.state.fromdate}
                    onChange={e => this.setState({ fromdate: e.target.value })}
                  />
                  <input
                    type="date"
                    name="todate"
                    value={this.state.todate}
                    onChange={e => this.setState({ todate: e.target.value })}
                  />
                  <button className="onFilter" type="submit">
                    Применить
                  </button>
                </form>
              )} */}

              {this.props.onAdd && (
                <button
                  className="control_button"
                  onClick={() => this.setState({ show: true })}
                >
                  Внести платеж
                </button>
              )}
            </div>

            {this.props.onFind && (
              <form className="findBlock" onSubmit={this.findItem}>
                <input
                  className="search_bar"
                  type="text"
                  name="find"
                  autoComplete="off"
                  placeholder="Поиск"
                  value={this.state.findVal}
                  onChange={e => this.setState({ findVal: e.target.value })}
                />
                <button className="cancel_button" onClick={this.cancelFinding}>
                  ×
                </button>
                <button className="search_button" type="submit">
                  <img src={search_img} width="23px" alt="Поиск" />
                </button>
              </form>
            )}
          </header>
        )}
        <form
          className={this.props.classNameForm}
          onSubmit={e => e.preventDefault()}
        >
          <div className="listContract">
            <table>
              <thead>
                <tr>
                  {headerList}
                  {this.props.control_input_list && <th />}
                </tr>
              </thead>
              <tbody>{contentList}</tbody>
            </table>
          </div>
          <div className="listPayment">
            <table>
              <thead>
                <tr>{header}</tr>
              </thead>
              <tbody>{content}</tbody>
            </table>
          </div>
        </form>
      </div>
    );
  }
}

TablePayments.defaultProps = {
  hideRows: [],
  control_input: false,
  header_display: false
};

export default TablePayments;
