import React, { Component } from 'react';
import './Authorization.css';

class Authorization extends Component{
    state = {
        values: {
            login: 'abramova',
            password: '12345'
        }
    };

    handleChange = event => {
        this.setState({
            values: {
                ...this.state.values,
                [event.target.login]: event.target.value,
                [event.target.password]: event.target.value
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
            <div className='mainblock'>
                <h2>Авторизация</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Логин: 
                    <input type='text' name='login' value={this.state.values.login} onChange={this.handleChange} />
                    </label>
                    <label>Пароль: 
                    <input type='text' name='password' value={this.state.values.password} onChange={this.handleChange} />
                    </label>
                    <input type='submit' value='Print' />
                </form>
            </div>
        );
    }
}

export default Authorization;
