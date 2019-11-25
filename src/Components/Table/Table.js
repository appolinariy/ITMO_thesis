import React from "react";
import "./Table.css";
import search_img from './search.png';

class Table extends React.Component {
  state = {
    value: 0,
    data: {},
    open: false,
    rows: []
  };

  componentDidMount() {
    console.log(this.props)
    this.setState({rows: this.props.data})
  }

  handleChange = e => {
    console.log(e.target.value, this.props.data);
    this.setState({ value: e.target.value });
  };

  handleDelete = id => {
    if(id) {
      let res = this.props.data.filter(row => {
        //console.log(row, this.props.keyCol, row[this.props.keyCol], id)
        return row[this.props.keyCol] === id;
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
    if(this.state.data[this.props.keyCol]) {
      this.props.onAdd({
        ...this.state.data,
        id: newId
      });

      this.setState({ data: {}, value: 0, show: false });
    }
  };

  handleEdit = e => {
    e.preventDefault()
    this.props.onUpdate(this.state.data)
    // console.log('edited', this.state.data)
    this.setState({ data: {}, show: false, edit: false });
  }

  findUserIndex = id => {
    let item = this.props.data.find(el => el[this.props.keyCol] === id);
    // console.log(item);
    this.setState({data: item})
  }

  findItem = (e, id, col) => {
    e.preventDefault()
    console.log(id, col)
    let data = this.props.data.filter(el => el[col].includes(id));
    console.log(data)
    this.props.onFind(data)
    //this.setState({toRender: data})
  }

  render() {
    let header = this.props.header.map(col => <th>{col.name}</th>);

    let content = this.props.data.map(el => {
      let data = this.props.header.map(col => <td>{el[col.key]}</td>);

      return (
        <>
          <tr>
          {this.props.control_input && <td>
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

    let insert = this.props.header.map(el => <label htmlFor="name" className='alertName'>
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

    return (
      
      <div className="table_container">
        {this.state.show && (
          <div className='alertBlock' onClick={() => this.setState({ show: false })}>
            <form className='add_row alertForm' onSubmit={this.state.edit ? this.handleEdit : this.handleAdd}  onClick={e => e.stopPropagation()}>
                {insert}
              <div className='alertButton'>
                <button className='buttonOk' type="submit">Ok</button>
                <button className='buttonClose' onClick={() => this.setState({ show: false })}>Close</button>
              </div>
            </form>
          </div>
        )}
        {this.props.header_display && <header className='table_header'>
          <div>
            {this.props.onAdd && <button className='control_button' onClick={() => this.setState({ show: true })}>Добавить</button>}
            {this.props.onUpdate && <button className='control_button' onClick={() => {
              if(this.state.value){
                this.setState({show: true, edit: true},
                () => this.findUserIndex(this.state.value))
              }
            }}>Редактировать</button>}
            {this.props.onDelete && <button className='control_button' onClick={() => this.handleDelete(this.state.value)}>Удалить</button>}
          </div>  
          {this.props.onFind && <form onSubmit={(e) => this.findItem(e, this.state.findVal, this.props.findCol)} >
            <input className='search_bar' type='text' name='find' value={this.state.find} onChange={e => this.setState({findVal: e.target.value})} /> 
            <button className='search_button' type='submit'>
              <img src={search_img} width='24px' height='24px' alt='Поиск'/>
            </button>
          </form>}
         </header>}
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
