import React from "react";

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
      return (
        <>
          <input
            type="radio"
            name="id"
            value={el[this.props.keyCol]}
            onChange={this.handleChange}
          />
          <tr>{data}</tr>
        </>
      );
    });

    let insert = this.props.header.map(el => <label htmlFor="name">
    {el.name}
    <input
      type="text"
      id={el.key}
      value={this.state.data[el.key]}
      onChange={this.inputChange}
      name={el.key}
    />
  </label>)

    return (
      <div>
        <form onSubmit={e => e.preventDefault()}>
          <button onClick={() => this.setState({ show: true })}>Add</button>
          <button onClick={() => this.handleDelete(this.state.value)}>
            Delete
          </button>

          <table>
            {header}
            {content}
          </table>
        </form>
        {this.state.show && (
          <div
            // style={{
            //   position: "absolute",
            //   width: "100vw",
            //   height: "100vh",
            //   backgroundColor: "0x000000"
            //   //opacity: 0.4
            // }}
          >
            <form
            //   style={{
            //     position: "relative",
            //     background: "0xffffff",
            //     padding: "30px",
            //     margin: "auto",
            //     opacity: 1
            //   }}
              onSubmit={this.handleAdd}
            >
                {insert}
              {/* <label htmlFor="name">
                Name
                <input
                  type="text"
                  id="name"
                  value={this.state.data.name}
                  onChange={this.inputChange}
                  name="name"
                />
              </label>
              <label htmlFor="age">
                Age
                <input
                  type="number"
                  id="age"
                  value={this.state.data.age}
                  onChange={this.inputChange}
                  name="age"
                />
              </label> */}
              <button onClick={() => this.setState({ show: false })}>
                Close
              </button>
              <button type="submit">Ok</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Table;
