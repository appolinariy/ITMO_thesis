import React from "react";
import "./Table.css";

class Table extends React.Component {
  state = {
    value: 0,
    data: {},
    open: false
  };

  handleChange = e => {
    console.log(e.target.value);
    this.setState({ value: e.target.value });
  };

  handleDelete = id => {
    let res = this.props.data.filter(row => {
      //console.log(row, this.props.keyCol, row[this.props.keyCol], id)
      return row[this.props.keyCol] == id;
    });
    console.log(id);
    this.props.onDelete(res[0]);
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
    this.props.onAdd({
      ...this.state.data,
      id: newId
    });

    this.setState({ data: {}, value: 0, show: false });
  };

  render() {
    let header = this.props.header.map(col => <th>{col.name}</th>);

    let content = this.props.data.map(el => {
      let data = this.props.header.map(col => <td>{el[col.key]}</td>);

      const control_input = this.props.control_input;

      return (
        <>
          <tr>
            {data}
            {control_input && <td>
              <input
              type="radio"
              name="id"
              value={el[this.props.keyCol]}
              onChange={this.handleChange}
              />
            </td>}
          </tr>
        </>
      );
    });

    let insert = this.props.header.map(el => <label htmlFor="name">
    {el.name}
    <input
      type="text"
      autoComplete="off"
      id={el.key}
      value={this.state.data[el.key]}
      onChange={this.inputChange}
      name={el.key}
    />
  </label>)

    const control_add = this.props.control_add;
    const control_delete = this.props.control_delete;

    return (
      
      <div>
        {this.state.show && (
          <div>
            <form onSubmit={this.handleAdd} className='add_row'>
                {insert}
              <button onClick={() => this.setState({ show: false })}>Close</button>
              <button type="submit">Ok</button>
            </form>
          </div>
        )}
        <form onSubmit={e => e.preventDefault()}>
          {control_delete && <button className='add_delete' onClick={() => this.handleDelete(this.state.value)}>Удалить</button>}
          {control_add && <button className='add_delete' onClick={() => this.setState({ show: true })}>Добавить</button>}
          <table className={this.props.className}>
            {header}
            {content}
          </table>
        </form>
      </div>
    );
  }
}

export default Table;
