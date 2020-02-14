import React, { Component } from 'react';
import './Authorization.css';
import { authorization } from "../../libs/effects";
import { withRouter } from "react-router";
import sovk from "./sovk.png";

class Authorization extends Component {
  state = {
    values: {
      login: '',
      password: ''
    },
    button: false
  };

  handleChange = event => {
    this.setState({
      values: {
        ...this.state.values,
        [event.target.name]: event.target.value
      }
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    authorization(this.state.values.login, this.state.values.password).then(res => {
      res && this.props.history.push('/filials')
      window.location.reload()
    })
  }

  render() {
    return (
      <main>
        <div className='mainblock'>
          <img src={sovk} width='30%' alt='Совкомбанк' />
          <h3>ВХОД В СИСТЕМУ УЧЕТА КРЕДИТНЫХ ВЫПЛАТ</h3>
          <form onSubmit={this.handleSubmit}>
            <label>Введите логин:</label>
            <input type='text' autoComplete='disabled' name='login' placeholder='Логин' value={this.state.values.login} onChange={this.handleChange} />
            <label>Введите пароль:</label>
            <input type='password' autoComplete='disabled' name='password' placeholder='Пароль' value={this.state.values.password} onChange={this.handleChange} />
            <input type='submit' value='Войти в Систему' />
          </form>
        </div>
      </main>
    );
  }
}

export default withRouter(Authorization);
