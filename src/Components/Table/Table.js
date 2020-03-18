import React from "react";
import "./Table.css";
import search_img from "./search.png";

import { Alert } from "./Alert";

class Table extends React.Component {
  state = {
    value: 0,
    data: {},
    open: false,
    rows: [],
    findVal: ""
  };

  componentDidMount() {
    this.setState({ rows: this.props.data });
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleDelete = id => {
    if (id) {
      let res = this.props.data.filter(row => {
        return row[this.props.keyCol] === id;
      });
      this.props.onDelete(res[0]);
      this.setState({ value: 0 });
    }
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

  handleEdit = e => {
    e.preventDefault();
    this.props.onUpdate(this.state.data);
    this.setState({ data: {}, show: false, edit: false });
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

  render() {
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
          <tr key={index}>
            {this.props.control_input && (
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
            {data}
          </tr>
        )
      );
    });

    let newHeader = this.props.header.filter(el => {
      let flag = true;
      this.props.thForTable.forEach(th => {
        if (el.key == th) {
          flag = false;
        }
      });
      return flag;
    });

    console.log(newHeader);

    return (
      <div className="table_container">
        {this.state.show && (
          <Alert
            edit={this.state.edit}
            header={newHeader}
            onClose={() => this.setState({ show: false })}
            data={this.state.data}
            title={this.props.alert_name}
            onChange={this.inputChange}
            handleAdd={this.handleAdd}
            handleEdit={this.handleEdit}
            styles={this.props.styles}
          />
        )}
        {this.props.header_display && (
          <header className="table_header">
            <div className="button_container">
              {this.props.onAdd && (
                <button
                  className="control_button"
                  onClick={() => this.setState({ show: true })}
                >
                  Добавить
                </button>
              )}
              {this.props.onUpdate && (
                <button
                  className="control_button"
                  onClick={() => {
                    if (this.state.value) {
                      this.setState({ show: true, edit: true }, () =>
                        this.findUserIndex(this.state.value)
                      );
                    }
                  }}
                >
                  Редактировать
                </button>
              )}
              {this.props.onDelete && (
                <button
                  className="control_button"
                  onClick={() => this.handleDelete(this.state.value)}
                >
                  Удалить
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
                  <img src={search_img} width="24px" alt="Поиск" />
                </button>
              </form>
            )}
          </header>
        )}
        <form
          className={this.props.classNameForm}
          onSubmit={e => e.preventDefault()}
        >
          <table className={this.props.className}>
            <thead>
              {this.props.control_input && <th />}
              {header}
            </thead>
            <tbody>{content}</tbody>
          </table>
        </form>
      </div>
    );
  }
}

Table.defaultProps = {
  hideRows: [],
  control_input: false,
  header_display: false
};

export default Table;
