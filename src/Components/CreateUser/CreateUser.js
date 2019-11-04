import React, { Component } from 'react';
import './CreateUser.css';

class CreateUser extends Component{
  state = {
    values: {
      surname: '',
      name: '',
      father_name: '',
      position: '',
      system_role: '',
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
    this.setState({
      button: !this.state.button
    })
    console.log(this.state.button);
    console.log(this.state.values.surname);
    console.log(this.state.values.name);
    console.log(this.state.values.father_name);
    console.log(this.state.values.position);
    console.log(this.state.values.system_role);
    console.log(this.state.values.login);
    console.log(this.state.values.password);
  }

  render(){
    let content = (this.state.button===true) && <h1>Hello</h1>;
    return(
      <main>
        <h3 align='center'>Создайте пользователя</h3>
        <div className='mainblock'>
          <form onSubmit={this.handleSubmit}>
          <label>Фамилия: </label>
              <input type='text' autoComplete='off' name='surname' placeholder='Фамилия' value={this.state.values.surname} onChange={this.handleChange} />
            <label>Имя:</label>
              <input type='text' autoComplete='off' name='name' placeholder='Имя' value={this.state.values.name} onChange={this.handleChange} />
          <label>Отчество: </label>
              <input type='text' autoComplete='off' name='father_name' placeholder='Отчество' value={this.state.values.father_name} onChange={this.handleChange} />
            <label>Должность пользователя:</label>
              <input type='text' autoComplete='off' name='position' placeholder='Должность' value={this.state.values.position} onChange={this.handleChange} />
              <label>Роль в системе:</label>
              <input type='text' autoComplete='off' name='system_role' placeholder='Роль в системе' value={this.state.values.system_role} onChange={this.handleChange} />
            <label>Логин: </label>
              <input type='text' autoComplete='off' name='login' placeholder='Логин' value={this.state.values.login} onChange={this.handleChange} />
            <label>Пароль:</label>
              <input type='text' autoComplete='off' name='password' placeholder='Пароль' value={this.state.values.password} onChange={this.handleChange} />
            <input type='submit' value='Создать пользователя' />
          </form>
        </div>
        {content}
      </main>
    );
  }
}

export default CreateUser;
