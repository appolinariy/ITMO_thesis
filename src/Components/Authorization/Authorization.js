import React, { Component } from "react";
import "./Authorization.css";
import { authorization } from "../../libs/effects";
import { withRouter } from "react-router";
import logo1 from "./logo1.png";

class Authorization extends Component {
  state = {
    values: {
      login: "",
      password: ""
    },
    button: false,
    log_in: 1
  };

  handleChange = event => {
    this.setState({
      values: {
        ...this.state.values,
        [event.target.name]: event.target.value
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.values.login || !this.state.values.password) {
      this.setState({ log_in: 3 });
    } else {
      authorization(this.state.values.login, this.state.values.password).then(
        res => {
          res && this.setState({ log_in: 1 });
          res && this.props.history.push("/filials");
          res && window.location.reload();
          this.setState({ log_in: 2 });
        }
      );
    }
  };

  render() {
    return (
      <main>
        <div className="mainblock">
          <img className="bankIcon" src={logo1} width="27%" alt="SkyBank" />
          <p className="nameSystem">ВХОД В СИСТЕМУ УЧЕТА КРЕДИТНЫХ ВЫПЛАТ</p>
          <form onSubmit={this.handleSubmit}>
            <label>Введите логин:</label>
            <input
              type="text"
              autoComplete="disabled"
              name="login"
              placeholder="Логин"
              value={this.state.values.login}
              onChange={this.handleChange}
            />
            <label>Введите пароль:</label>
            <input
              type="password"
              autoComplete="disabled"
              name="password"
              placeholder="Пароль"
              value={this.state.values.password}
              onChange={this.handleChange}
            />
            {this.state.log_in === 2 && (
              <h5 className="incorrect">Ошибка: неверный логин или пароль</h5>
            )}
            {this.state.log_in === 3 && (
              <h5 className="incorrect">Ошибка: не все поля были заполнены</h5>
            )}
            <input type="submit" value="Войти" />
          </form>
        </div>
      </main>
    );
  }
}

export default withRouter(Authorization);
