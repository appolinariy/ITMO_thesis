import React, { Component } from 'react';
import './Authorization.css';
import { authorization } from "../../libs/effects";
import { withRouter } from "react-router";

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
    console.log(this.state.button);
    console.log(this.state.values.login);
    console.log(this.state.values.password);
  }

  render() {
    return (
      <main>
        <div className='mainblock'>
          <h3>Авторизуйтесь в системе</h3>
          <form onSubmit={this.handleSubmit}>
            <label>Логин: </label>
            <input type='text' autoComplete='off' name='login' placeholder='Введите логин' value={this.state.values.login} onChange={this.handleChange} />
            <label>Пароль:</label>
            <input type='password' autoComplete='off' name='password' placeholder='Введите пароль' value={this.state.values.password} onChange={this.handleChange} />
            <input type='submit' value='Войти' />
          </form>
        </div>
      </main>
    );
  }
}

export default withRouter(Authorization);
