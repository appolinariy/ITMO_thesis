import React, { Component } from 'react';
import './Authorization.css';

class Authorization extends Component{
  state = {
    values: {
      login: '',
      password: ''
    }
  };

  handleChange = event => {
    this.setState({
      values: {
        ...this.state.values,
        [event.target.name]: event.target.value,
        [event.target.name]: event.target.value
      }
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.values.login);
    console.log(this.state.values.password);
  }

  render(){
    return(
      <main>
        <div className='mainblock'>
          <h3>Авторизуйтесь в системе</h3>
          <form onSubmit={this.handleSubmit}>
            <label>Логин: </label>
              <input type='text' name='login' placeholder='Введите логин' value={this.state.values.login} onChange={this.handleChange} />
            <label>Пароль:</label>
              <input type='text' name='password' placeholder='Введите пароль' value={this.state.values.password} onChange={this.handleChange} />
            <input type='submit' value='Войти' />
          </form>
        </div>
      </main>
    );
  }
}

export default Authorization;
