import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import logo1 from "../Authorization/logo1.png";
import user1 from "./user1.png";
import { withRouter } from "react-router";
import "./MainComponent.css";
import Filial from "./Filial/Filial";
import Borrower from "./Borrower/Borrower";
import Contract from "./Contract/contract";
import Adminka from "./Adminka/Adminka";
import Authorization from "../Authorization/Authorization";
import Payment from "./Payment/payment";

class MainComponent extends Component {
  state = {
    user: null,
    selected: ""
  };

  componentDidMount() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    this.setState({ user: user, selected: "filials" });
    if (!user) {
      this.props.history.push("/auth");
    }
  }

  handleSelect = module => {
    this.setState({ selected: module });
    console.log("state", this.state.selected);
  };

  logout = () => {
    sessionStorage.removeItem("user");
    this.props.history.push("/auth");
  };

  render() {
    return this.state.user ? (
      <div className="content">
        {this.props.history.location.pathname !== "/auth" && (
          <header>
            <div className="icon">
              <img src={logo1} width="120px" alt="SkyBank" />
              <p className="SystemName">СИСТЕМА УЧЕТА КРЕДИТНЫХ ВЫПЛАТ</p>
              <div className="currentUser">
                {this.state.user.surname +
                  " " +
                  this.state.user.name +
                  " " +
                  this.state.user.father_name}
                <img className="userpic" src={user1} width="27px" alt="user" />
              </div>
            </div>
            <div className="links">
              <div
                className={
                  this.state.selected === "filials"
                    ? "module selected"
                    : "module unselected"
                }
              >
                <Link
                  to="/filials"
                  onClick={() => this.handleSelect("filials")}
                >
                  Справочник
                </Link>
              </div>
              <div
                className={
                  this.state.selected === "borrowers"
                    ? "module selected"
                    : "module unselected"
                }
              >
                <Link
                  to="/borrowers"
                  onClick={() => this.handleSelect("borrowers")}
                >
                  Заемщики
                </Link>
              </div>
              <div
                className={
                  this.state.selected === "contracts"
                    ? "module selected"
                    : "module unselected"
                }
              >
                <Link
                  to="/contracts"
                  onClick={() => this.handleSelect("contracts")}
                >
                  Контракты
                </Link>
              </div>
              <div
                className={
                  this.state.selected === "debts"
                    ? "module selected"
                    : "module unselected"
                }
              >
                <Link to="/debts" onClick={() => this.handleSelect("debts")}>
                  Выплаты
                </Link>
              </div>
              <div
                className={
                  this.state.selected === "adminka"
                    ? "module selected"
                    : "module unselected"
                }
              >
                <Link
                  to="/adminka"
                  onClick={() => this.handleSelect("adminka")}
                >
                  Администрирование
                </Link>
              </div>
              <input
                className="logout"
                type="button"
                value="Выйти"
                onClick={this.logout}
              />
            </div>
          </header>
        )}
        <Switch>
          <Route path="/borrowers">
            <div className="main">
              <Borrower />
            </div>
          </Route>
          <Route path="/contracts">
            <div className="main">
              <Contract />
            </div>
          </Route>
          <Route path="/debts">
            <div className="main">
              <Payment />
            </div>
          </Route>
          <Route path="/adminka">
            <div className="main">
              <Adminka user={this.state.user} />
            </div>
          </Route>
          <Route path="/filials">
            <div className="main filial">
              <Filial />
            </div>
          </Route>
          <Route path="/auth">
            <Authorization />
          </Route>
        </Switch>
      </div>
    ) : (
      <Route path="/auth">
        <Authorization />
      </Route>
    );
  }
}

export default withRouter(MainComponent);
