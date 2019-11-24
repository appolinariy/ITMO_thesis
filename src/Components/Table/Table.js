import React from "react";
import "./Table.css";

class Table extends React.Component {
  state = {
    value: 0,
    data: {},
    open: false
  };

  handleChange = e => {
    console.log(e.target.value, this.props.data);
    this.setState({ value: e.target.value });
  };

  handleDelete = id => {
    if(id) {
      let res = this.props.data.filter(row => {
        //console.log(row, this.props.keyCol, row[this.props.keyCol], id)
        return row[this.props.keyCol] == id;
      });
      console.log(id);
      this.props.onDelete(res[0]);
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
    this.props.onAdd({
      ...this.state.data,
      id: newId
    });

    this.setState({ data: {}, value: 0, show: false });
  };

  handleEdit = e => {
    e.preventDefault()
    this.props.onUpdate(this.state.data)
    // console.log('edited', this.state.data)
    this.setState({ data: {}, value: 0, show: false, edit: false });
  }

  findUserIndex = id => {
    let item = this.props.data.find(el => el[this.props.keyCol] == id);
    // console.log(item);
    this.setState({data: item})
  }

  findItem = (e, id, col) => {
    e.preventDefault()
    console.log(id, col)
    let data = this.props.data.filter(el => el[col].includes(id));
    console.log(data)
    this.props.onFind(data)
  }

  render() {
    let header = this.props.header.map(col => <th>{col.name}</th>);

    let content = this.props.data.map(el => {
      let data = this.props.header.map(col => <td>{el[col.key]}</td>);

      const control_input = this.props.control_input;

      return (
        <>
          <tr>
          {control_input && <td>
              <input
              type="radio"
              name="id"
              value={el[this.props.keyCol]}
              onChange={this.handleChange}
              />
            </td>}
            {data}
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
      
      <div className="table_container">
        {this.state.show && (
          <div style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 1, top: 0, left: 0}} onClick={() => this.setState({ show: false })}>
            <form style={{ width: '30%',margin: 'auto', marginTop: '10%', backgroundColor: 'white', padding: '30px'}} onSubmit={this.state.edit ? this.handleEdit : this.handleAdd} className='add_row' onClick={e => e.stopPropagation()}>
                {insert}
              <button onClick={() => this.setState({ show: false })}>Close</button>
              <button type="submit">Ok</button>
            </form>
          </div>
        )}
        <header className='table_header'>
          <div>
            {this.props.onUpdate && <button className='add_delete' onClick={() => this.setState({show: true, edit: true}, () => this.findUserIndex(this.state.value))}>Редактировать</button>}
            {control_delete && <button className='add_delete' onClick={() => this.handleDelete(this.state.value)}>Удалить</button>}
            {control_add && <button className='add_delete' onClick={() => this.setState({ show: true })}>Добавить</button>}
          </div>  
          <form onSubmit={(e) => this.findItem(e, this.state.findVal, this.props.findCol)} className='search_bar'>
            <input name='find' value={this.state.find} onChange={e => this.setState({findVal: e.target.value})} /> 
            <button type='submit'>Найти</button>
          </form>
         </header>
         <form onSubmit={e => e.preventDefault()}>  
          <table className={this.props.className}>
            {this.props.control_input && <th />}
            {header}
            {content}
          </table>
        </form>
      </div>
    );
  }
}

export default Table;
