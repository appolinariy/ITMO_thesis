import React from "react";
import "./Table.css";
import search_img from './search.png';

class Table extends React.Component {
  state = {
    value: 0,
    data: {},
    open: false,
    rows: [],
    findVal: ''
  };

  componentDidMount() {
    this.setState({ rows: this.props.data })
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
    e.preventDefault()
    this.props.onUpdate(this.state.data)
    this.setState({ data: {}, show: false, edit: false });
  }

  findUserIndex = id => {
    let item = this.props.data.find(el => el[this.props.keyCol] === id);
    this.setState({ data: item })
  }

  findItem = (e) => {
    e.preventDefault()
    this.props.onFind(this.state.findVal)
  }

  cancelFinding = () => {
    this.setState({ findVal: '' })
    this.props.onFind('')
  }

  render() {
    let header = this.props.header.map(col => this.props.hideRows && !this.props.hideRows.includes(col.key) && <th>{col.name}</th>);

    let content = this.props.data.map(el => {

      let data = this.props.header.map(col => this.props.hideRows && !this.props.hideRows.includes(col.key) && <td>{el[col.key]}</td>);

      return data && (
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

    let insert = this.props.header.map(el => <label key={el.key} htmlFor="name" className='alertName'>
      {el.name}
      {el.type === 'select' ? <select onChange={this.inputChange} name={el.key}>{el.options && el.options.map(option => <option key={option.id} value={option.text}>{option.text}</option>)}</select> :
        <input
          type="text"
          autoComplete="off"
          id={el.key}
          value={this.state.data[el.key]}
          onChange={this.inputChange}
          name={el.key}
        />
      }
    </label>)

    return (
      <div className="table_container">
        {this.state.show && (
          <div className='alertBlock' onClick={() => this.setState({ show: false })}>
            <form
              autoComplete='disabled'
              className='add_row alertForm'
              style={this.props.styles}
              onSubmit={this.state.edit ? this.handleEdit : this.handleAdd}
              onClick={e => e.stopPropagation()}>
              {this.state.edit ? <h3>Окно редактирования {this.props.alert_name} </h3> : <h3>Окно добавления {this.props.alert_name} </h3>}
              {insert}
              <div className='alertButton'>
                {this.state.edit ? <button className='buttonEdit' type="submit">Сохранить изменения</button> : <button className='buttonAdd' type="submit">Добавить</button>}
                <button className='buttonClose' onClick={() => this.setState({ show: false })}>Отмена</button>
              </div>
            </form>
          </div>
        )}
        {this.props.header_display && <header className='table_header'>
          <div>
            {this.props.onAdd && <button className='control_button' onClick={() => this.setState({ show: true })}>Добавить</button>}
            {this.props.onUpdate && <button className='control_button' onClick={() => {
              if (this.state.value) {
                this.setState({ show: true, edit: true },
                  () => this.findUserIndex(this.state.value))
              }
            }}>Редактировать</button>}
            {this.props.onDelete && <button className='control_button' onClick={() => this.handleDelete(this.state.value)}>Удалить</button>}
          </div>

          {this.props.onFind && <form className={this.props.classNameFind} onSubmit={this.findItem} >
            <input className='search_bar' type='text' name='find' autoComplete='off' placeholder='Поиск' value={this.state.findVal} onChange={e => this.setState({ findVal: e.target.value })} />
            <button className='cancel_button' type='button' onClick={this.cancelFinding}>×</button>
            <button className='search_button' type='submit'>
              <img src={search_img} width='26px' alt='Поиск' />
            </button>
          </form>}
        </header>}
        <form className={this.props.classNameForm} onSubmit={e => e.preventDefault()}>
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

Table.defaultProps = {
  hideRows: [],
  control_input: false,
  header_display: false
}

export default Table;
